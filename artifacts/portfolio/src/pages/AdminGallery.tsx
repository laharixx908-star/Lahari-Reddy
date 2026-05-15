import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/lib/AdminShell";
import { T, inputStyle, labelStyle, cardStyle, btnPrimary, btnDanger } from "@/lib/adminTheme";

type GalleryItem = { id: string; title: string; category: string; image_url: string };

export default function AdminGallery() {
  const [images, setImages]     = useState<GalleryItem[]>([]);
  const [title, setTitle]       = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile]         = useState<File | null>(null);
  const [preview, setPreview]   = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.from("gallery").select("*").order("order_index")
      .then(({ data }) => setImages(data || []));
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const upload = async () => {
    if (!file) return alert("Please select an image.");
    setUploading(true);
    const ext  = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("portfolio-media").upload(path, file);
    if (upErr) { alert("Upload failed: " + upErr.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("portfolio-media").getPublicUrl(path);
    const { data, error } = await supabase.from("gallery").insert({ title, category, image_url: publicUrl, order_index: images.length }).select();
    if (error) { alert(error.message); setUploading(false); return; }
    setImages(prev => [...prev, data![0]]);
    setTitle(""); setCategory(""); setFile(null); setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    setUploading(false);
  };

  const remove = async (id: string, image_url: string) => {
    if (!confirm("Delete this image?")) return;
    const path = image_url.split("/portfolio-media/")[1];
    if (path) await supabase.storage.from("portfolio-media").remove([path]);
    await supabase.from("gallery").delete().eq("id", id);
    setImages(prev => prev.filter(i => i.id !== id));
  };

  return (
    <AdminShell title="Gallery" subtitle="Upload and manage gallery images">
      <div style={{ ...cardStyle, marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginBottom: "1.125rem" }}>Upload New Image</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={labelStyle}>Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Events" style={inputStyle} />
          </div>
        </div>
        <div onClick={() => fileRef.current?.click()}
          style={{ border: `1.5px dashed ${T.purpleBorder}`, borderRadius: "10px", padding: "1.75rem", textAlign: "center", cursor: "pointer", marginBottom: "1rem", background: preview ? "#0a0a0a" : "transparent" }}>
          {preview ? (
            <img src={preview} alt="preview" style={{ maxHeight: "150px", maxWidth: "100%", borderRadius: "8px", objectFit: "cover" }} />
          ) : (
            <p style={{ color: T.textMuted, margin: 0, fontSize: "0.875rem" }}>Click to choose an image</p>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </div>
        <button onClick={upload} disabled={uploading || !file}
          style={{ ...btnPrimary, opacity: uploading || !file ? 0.5 : 1, cursor: uploading || !file ? "not-allowed" : "pointer" }}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
        {images.map(img => (
          <div key={img.id} style={{ background: T.bgSurface, border: `0.5px solid ${T.purpleBorder}`, borderRadius: "12px", overflow: "hidden" }}>
            <img src={img.image_url} alt={img.title} style={{ width: "100%", height: "130px", objectFit: "cover", display: "block" }} />
            <div style={{ padding: "0.75rem" }}>
              <p style={{ margin: "0 0 0.25rem", fontSize: "0.82rem", color: T.textPrimary }}>{img.title || "Untitled"}</p>
              {img.category && <p style={{ margin: "0 0 0.625rem", fontSize: "0.7rem", color: T.purple }}>{img.category}</p>}
              <button onClick={() => remove(img.id, img.image_url)} style={{ ...btnDanger, width: "100%" }}>Delete</button>
            </div>
          </div>
        ))}
        {images.length === 0 && <p style={{ color: T.textDim, gridColumn: "1/-1", textAlign: "center", padding: "2rem", fontSize: "0.875rem" }}>No images yet.</p>}
      </div>
    </AdminShell>
  );
}