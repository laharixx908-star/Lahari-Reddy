import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/lib/AdminShell";
import { T, inputStyle, labelStyle, btnPrimary } from "@/lib/adminTheme";

export default function AdminBlogEditor() {
  const params          = useParams<{ id: string }>();
  const isNew           = !params.id || params.id === "new";
  const [, navigate]    = useLocation();
  const [title, setTitle]       = useState("");
  const [slug, setSlug]         = useState("");
  const [content, setContent]   = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [tab, setTab]           = useState<"write" | "preview">("write");

  useEffect(() => {
    if (!isNew && params.id) {
      supabase.from("blogs").select("*").eq("id", params.id).single()
        .then(({ data }) => { if (data) { setTitle(data.title); setSlug(data.slug); setContent(data.content || ""); setPublished(data.published); } });
    }
  }, [params.id]);

  const autoSlug = (v: string) => v.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

  const save = async () => {
    if (!title.trim() || !slug.trim()) return alert("Title and slug are required.");
    setSaving(true);
    const payload = { title, slug, content, published, updated_at: new Date().toISOString() };
    if (isNew) await supabase.from("blogs").insert(payload);
    else await supabase.from("blogs").update(payload).eq("id", params.id!);
    setSaving(false); setSaved(true);
    setTimeout(() => { setSaved(false); navigate("/admin/blogs"); }, 1000);
  };

  const renderPreview = (md: string) => md
    .replace(/^### (.+)$/gm, "<h3 style='color:#ddd6fe;font-family:Georgia,serif;font-weight:400'>$1</h3>")
    .replace(/^## (.+)$/gm,  "<h2 style='color:#ddd6fe;font-family:Georgia,serif;font-weight:400'>$1</h2>")
    .replace(/^# (.+)$/gm,   "<h1 style='color:#ddd6fe;font-family:Georgia,serif;font-weight:400'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong style='color:#ddd6fe'>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");

  const tabBtn = (t: "write" | "preview") => ({
    padding: "0.45rem 1.125rem", border: "none", background: "none", cursor: "pointer",
    fontSize: "0.78rem", color: tab === t ? T.purple : T.textMuted,
    borderBottom: tab === t ? `2px solid ${T.purple}` : "2px solid transparent",
    fontWeight: tab === t ? 500 : 400,
  } as React.CSSProperties);

  return (
    <AdminShell title={isNew ? "New Post" : "Edit Post"}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: T.textMuted, cursor: "pointer" }}>
          <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} style={{ accentColor: T.purple }} />
          Publish
        </label>
        <button onClick={save} disabled={saving || saved}
          style={{ ...btnPrimary, background: saved ? "#052010" : T.purple, color: saved ? T.success : "#fff", border: saved ? `0.5px solid #22c55e40` : "none" }}>
          {saved ? "Saved ✓" : saving ? "Saving..." : "Save Post"}
        </button>
      </div>

      <div style={{ background: T.bgSurface, border: `0.5px solid ${T.purpleBorder}`, borderRadius: "14px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.125rem" }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" value={title} onChange={e => { setTitle(e.target.value); if (isNew) setSlug(autoSlug(e.target.value)); }} placeholder="My Blog Post Title" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Slug (URL)</label>
          <div style={{ display: "flex", alignItems: "center", border: `0.5px solid ${T.purpleBorder}`, borderRadius: "8px", overflow: "hidden" }}>
            <span style={{ padding: "0.65rem 0.75rem", background: "#0a0a0a", color: T.textMuted, fontSize: "0.8rem", borderRight: `0.5px solid ${T.purpleBorder}`, whiteSpace: "nowrap" }}>/blog/</span>
            <input type="text" value={slug} onChange={e => setSlug(autoSlug(e.target.value))} placeholder="my-post-title" style={{ ...inputStyle, border: "none", borderRadius: 0, flex: 1 }} />
          </div>
        </div>
        <div>
          <div style={{ display: "flex", borderBottom: `0.5px solid ${T.borderMid}`, marginBottom: "0.875rem" }}>
            <button onClick={() => setTab("write")} style={tabBtn("write")}>Write</button>
            <button onClick={() => setTab("preview")} style={tabBtn("preview")}>Preview</button>
          </div>
          {tab === "write" ? (
            <>
              <label style={labelStyle}>Content (Markdown supported)</label>
              <textarea value={content} onChange={e => setContent(e.target.value)}
                placeholder={"# Heading\n\nWrite your blog post here...\n\n**Bold**, *italic*"}
                rows={20}
                style={{ ...inputStyle, fontFamily: "monospace", lineHeight: 1.7, resize: "vertical" }}
              />
            </>
          ) : (
            <div style={{ minHeight: "400px", padding: "1rem", border: `0.5px solid ${T.borderMid}`, borderRadius: "8px", lineHeight: 1.8, fontSize: "0.875rem", color: T.textMuted }}
              dangerouslySetInnerHTML={{ __html: renderPreview(content) || `<p style='color:${T.textDim}'>Nothing to preview.</p>` }}
            />
          )}
        </div>
      </div>
    </AdminShell>
  );
}