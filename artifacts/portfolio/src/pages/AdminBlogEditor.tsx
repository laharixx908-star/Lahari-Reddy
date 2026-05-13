import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/lib/AdminGuard";

export default function AdminBlogEditor() {
  const params = useParams<{ id: string }>();
  const isNew = !params.id || params.id === "new";
  const [, navigate] = useLocation();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"write" | "preview">("write");

  useEffect(() => {
    if (!isNew && params.id) {
      supabase.from("blogs").select("*").eq("id", params.id).single()
        .then(({ data }) => {
          if (data) {
            setTitle(data.title);
            setSlug(data.slug);
            setContent(data.content || "");
            setPublished(data.published);
          }
        });
    }
  }, [params.id]);

  const autoSlug = (val: string) =>
    val.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

  const save = async () => {
    if (!title.trim() || !slug.trim()) return alert("Title and slug are required.");
    setSaving(true);
    const payload = { title, slug, content, published, updated_at: new Date().toISOString() };
    if (isNew) {
      const { error } = await supabase.from("blogs").insert(payload);
      if (error) { alert("Error: " + error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("blogs").update(payload).eq("id", params.id!);
      if (error) { alert("Error: " + error.message); setSaving(false); return; }
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate("/admin/blogs"); }, 1000);
  };

  // Simple markdown → HTML preview (bold, italic, headings, line breaks)
  const renderPreview = (md: string) => {
    return md
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <AdminGuard>
      <div style={{ minHeight: "100vh", background: "#fdf8f6", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
            <div>
              <button onClick={() => navigate("/admin/blogs")} style={{ background: "none", border: "none", color: "#9c7b6e", cursor: "pointer", fontSize: "0.85rem", padding: 0, marginBottom: "0.5rem", display: "block" }}>
                ← All Blogs
              </button>
              <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.8rem", color: "#3a1f14", margin: 0 }}>
                {isNew ? "New Post" : "Edit Post"}
              </h1>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#5c3022", cursor: "pointer" }}>
                <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
                Publish
              </label>
              <button
                onClick={save}
                disabled={saving || saved}
                style={{ background: saved ? "#1e7a4a" : "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.625rem 1.5rem", cursor: "pointer", fontSize: "0.85rem", transition: "background 0.2s" }}
              >
                {saved ? "Saved ✓" : saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          <div style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "14px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            <div>
              <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>Title</label>
              <input
                type="text"
                value={title}
                onChange={e => { setTitle(e.target.value); if (isNew) setSlug(autoSlug(e.target.value)); }}
                placeholder="My Blog Post Title"
                style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "1rem", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>Slug (URL)</label>
              <div style={{ display: "flex", alignItems: "center", border: "0.5px solid #e8ddd9", borderRadius: "8px", overflow: "hidden" }}>
                <span style={{ padding: "0.65rem 0.75rem", background: "#f8f3f1", color: "#9c7b6e", fontSize: "0.85rem", borderRight: "0.5px solid #e8ddd9", whiteSpace: "nowrap" }}>/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(autoSlug(e.target.value))}
                  placeholder="my-blog-post-title"
                  style={{ flex: 1, padding: "0.65rem 0.875rem", border: "none", fontSize: "0.9rem", outline: "none" }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", gap: "0", marginBottom: "0.75rem", borderBottom: "0.5px solid #e8ddd9" }}>
                {(["write", "preview"] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{ padding: "0.5rem 1.25rem", border: "none", background: "none", cursor: "pointer", fontSize: "0.82rem", color: tab === t ? "#5c3022" : "#9c7b6e", borderBottom: tab === t ? "2px solid #5c3022" : "2px solid transparent", fontWeight: tab === t ? 600 : 400 }}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {tab === "write" ? (
                <>
                  <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>Content (Markdown supported)</label>
                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder={"# Heading\n\nWrite your blog post here...\n\n**Bold text**, *italic text*"}
                    rows={20}
                    style={{ width: "100%", padding: "0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", fontFamily: "monospace", lineHeight: 1.7, resize: "vertical", boxSizing: "border-box", outline: "none" }}
                  />
                </>
              ) : (
                <div
                  style={{ minHeight: "400px", padding: "1rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", lineHeight: 1.8, fontSize: "0.9rem", color: "#3a1f14" }}
                  dangerouslySetInnerHTML={{ __html: renderPreview(content) || "<p style='color:#9c7b6e'>Nothing to preview yet.</p>" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}