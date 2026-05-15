import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/lib/AdminShell";
import { T, cardStyle, btnPrimary, btnDanger } from "@/lib/adminTheme";

type Blog = { id: string; title: string; slug: string; published: boolean; created_at: string };

export default function AdminBlogs() {
  const [blogs, setBlogs]     = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [, navigate]          = useLocation();

  useEffect(() => {
    supabase.from("blogs").select("id,title,slug,published,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setBlogs(data || []); setLoading(false); });
  }, []);

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await supabase.from("blogs").delete().eq("id", id);
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const togglePublish = async (blog: Blog) => {
    await supabase.from("blogs").update({ published: !blog.published }).eq("id", blog.id);
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, published: !b.published } : b));
  };

  return (
    <AdminShell title="Blogs" subtitle="Write and publish blog posts">
      <div style={{ marginBottom: "1.25rem", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => navigate("/admin/blogs/new")} style={btnPrimary}>
          + New Post
        </button>
      </div>

      {loading && <p style={{ color: T.textMuted, fontSize: "0.875rem" }}>Loading...</p>}

      {!loading && blogs.length === 0 && (
        <div style={{ ...cardStyle, textAlign: "center", padding: "3rem" }}>
          <p style={{ color: T.textMuted, marginBottom: "1rem" }}>No blog posts yet.</p>
          <button onClick={() => navigate("/admin/blogs/new")} style={btnPrimary}>Write your first post</button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {blogs.map(blog => (
          <div key={blog.id} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: T.serif, fontSize: "0.95rem", color: T.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {blog.title}
                </span>
                <span style={{ fontSize: "0.65rem", padding: "0.2rem 0.625rem", borderRadius: "999px", background: blog.published ? "#052010" : "#1a1a1a", color: blog.published ? T.success : T.textMuted, border: `0.5px solid ${blog.published ? "#22c55e30" : "#ffffff15"}`, flexShrink: 0 }}>
                  {blog.published ? "Published" : "Draft"}
                </span>
              </div>
              <p style={{ fontSize: "0.72rem", color: T.textDim, margin: 0 }}>/{blog.slug}</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <button onClick={() => togglePublish(blog)} style={{ background: "none", border: `0.5px solid ${T.borderMid}`, borderRadius: "6px", color: T.textMuted, fontSize: "0.72rem", padding: "0.35rem 0.75rem", cursor: "pointer" }}>
                {blog.published ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => navigate(`/admin/blogs/${blog.id}`)} style={{ background: T.purpleDim, border: `0.5px solid ${T.purpleBorder}`, borderRadius: "6px", color: T.purple, fontSize: "0.72rem", padding: "0.35rem 0.75rem", cursor: "pointer" }}>
                Edit
              </button>
              <button onClick={() => deleteBlog(blog.id)} style={btnDanger}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}