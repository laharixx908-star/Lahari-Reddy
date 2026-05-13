import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/lib/AdminGuard";

type Blog = { id: string; title: string; slug: string; published: boolean; created_at: string };

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    supabase.from("blogs").select("id, title, slug, published, created_at")
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
    <AdminGuard>
      <div style={{ minHeight: "100vh", background: "#fdf8f6", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <button onClick={() => navigate("/admin/dashboard")} style={{ background: "none", border: "none", color: "#9c7b6e", cursor: "pointer", fontSize: "0.85rem", padding: 0, marginBottom: "0.5rem", display: "block" }}>
                ← Dashboard
              </button>
              <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.8rem", color: "#3a1f14", margin: 0 }}>Blogs</h1>
            </div>
            <button
              onClick={() => navigate("/admin/blogs/new")}
              style={{ background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.625rem 1.25rem", cursor: "pointer", fontSize: "0.85rem" }}
            >
              + New Post
            </button>
          </div>

          {loading ? (
            <p style={{ color: "#9c7b6e" }}>Loading...</p>
          ) : blogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#9c7b6e" }}>
              <p>No blog posts yet.</p>
              <button onClick={() => navigate("/admin/blogs/new")} style={{ background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.625rem 1.25rem", cursor: "pointer", fontSize: "0.85rem", marginTop: "0.75rem" }}>
                Write your first post
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {blogs.map(blog => (
                <div key={blog.id} style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.25rem" }}>
                      <span style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#3a1f14", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {blog.title}
                      </span>
                      <span style={{ fontSize: "0.68rem", padding: "0.2rem 0.625rem", borderRadius: "999px", background: blog.published ? "#eafaf0" : "#f5f5f5", color: blog.published ? "#1e7a4a" : "#666", flexShrink: 0 }}>
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "#9c7b6e", margin: 0 }}>/{blog.slug}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <button onClick={() => togglePublish(blog)} style={{ fontSize: "0.75rem", padding: "0.375rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "6px", background: "#fff", cursor: "pointer", color: "#5c3022" }}>
                      {blog.published ? "Unpublish" : "Publish"}
                    </button>
                    <button onClick={() => navigate(`/admin/blogs/${blog.id}`)} style={{ fontSize: "0.75rem", padding: "0.375rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "6px", background: "#fff", cursor: "pointer", color: "#3a1f14" }}>
                      Edit
                    </button>
                    <button onClick={() => deleteBlog(blog.id)} style={{ fontSize: "0.75rem", padding: "0.375rem 0.875rem", border: "none", borderRadius: "6px", background: "#fdecea", cursor: "pointer", color: "#c0392b" }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
