
import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/lib/AdminGuard";

type GalleryItem = { id: string; title: string; category: string; image_url: string };

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

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
    if (!file) return alert("Please select an image first.");
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("portfolio-media").upload(path, file);
    if (uploadError) { alert("Upload failed: " + uploadError.message); setUploading(false); return; }

    const { data: { publicUrl } } = supabase.storage.from("portfolio-media").getPublicUrl(path);

    const { data, error } = await supabase.from("gallery")
      .insert({ title, category, image_url: publicUrl, order_index: images.length })
      .select();
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
    <AdminGuard>
      <div style={{ minHeight: "100vh", background: "#fdf8f6", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button onClick={() => navigate("/admin/dashboard")} style={{ background: "none", border: "none", color: "#9c7b6e", cursor: "pointer", fontSize: "0.85rem", padding: 0, marginBottom: "0.5rem", display: "block" }}>← Dashboard</button>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.8rem", color: "#3a1f14", marginBottom: "1.75rem" }}>Gallery</h1>

          <div style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "14px", padding: "1.75rem", marginBottom: "1.75rem" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "1.25rem" }}>Upload New Image</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                  style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>Category</label>
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Events, Projects"
                  style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }} />
              </div>
            </div>

            <div
              onClick={() => fileRef.current?.click()}
              style={{ border: "1.5px dashed #e8ddd9", borderRadius: "10px", padding: "2rem", textAlign: "center", cursor: "pointer", marginBottom: "1rem", background: preview ? "#f8f3f1" : "transparent" }}
            >
              {preview ? (
                <img src={preview} alt="preview" style={{ maxHeight: "160px", maxWidth: "100%", borderRadius: "8px", objectFit: "cover" }} />
              ) : (
                <p style={{ color: "#9c7b6e", margin: 0, fontSize: "0.9rem" }}>Click to choose an image</p>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
            </div>

            <button onClick={upload} disabled={uploading || !file}
              style={{ background: uploading || !file ? "#c4a99e" : "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.65rem 1.5rem", cursor: uploading || !file ? "not-allowed" : "pointer", fontSize: "0.85rem" }}>
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {images.map(img => (
              <div key={img.id} style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "12px", overflow: "hidden" }}>
                <img src={img.image_url} alt={img.title} style={{ width: "100%", height: "150px", objectFit: "cover", display: "block" }} />
                <div style={{ padding: "0.75rem" }}>
                  <p style={{ margin: "0 0 0.25rem", fontSize: "0.85rem", color: "#3a1f14", fontWeight: 500 }}>{img.title || "Untitled"}</p>
                  {img.category && <p style={{ margin: "0 0 0.625rem", fontSize: "0.72rem", color: "#9c7b6e" }}>{img.category}</p>}
                  <button onClick={() => remove(img.id, img.image_url)} style={{ background: "#fdecea", color: "#c0392b", border: "none", borderRadius: "6px", padding: "0.3rem 0.75rem", cursor: "pointer", fontSize: "0.72rem", width: "100%" }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {images.length === 0 && <p style={{ color: "#9c7b6e", gridColumn: "1/-1", textAlign: "center", padding: "2rem" }}>No images uploaded yet.</p>}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}