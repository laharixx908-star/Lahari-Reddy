import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/lib/AdminGuard";

export default function AdminDashboard() {
  const [, navigate] = useLocation();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const tiles = [
    { emoji: "📝", label: "Blogs", desc: "Write & publish blog posts", path: "/admin/blogs" },
    { emoji: "💼", label: "Experience", desc: "Add / remove experience entries", path: "/admin/experience" },
    { emoji: "🖼️", label: "Gallery", desc: "Upload & manage gallery images", path: "/admin/gallery" },
  ];

  return (
    <AdminGuard>
      <div style={{ minHeight: "100vh", background: "#fdf8f6", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
            <div>
              <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "2rem", color: "#3a1f14", margin: 0 }}>Dashboard</h1>
              <p style={{ color: "#9c7b6e", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>Lahari's Portfolio CMS</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a href="/" style={{ fontSize: "0.8rem", color: "#9c7b6e", textDecoration: "none", padding: "0.5rem 1rem", border: "0.5px solid #e8ddd9", borderRadius: "8px" }}>← View Site</a>
              <button onClick={logout} style={{ fontSize: "0.8rem", color: "#c0392b", background: "#fdecea", border: "none", borderRadius: "8px", padding: "0.5rem 1rem", cursor: "pointer" }}>Logout</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {tiles.map(tile => (
              <button key={tile.label} onClick={() => navigate(tile.path)}
                style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "14px", padding: "1.75rem 1.5rem", textAlign: "left", cursor: "pointer", boxShadow: "0 2px 12px rgba(92,48,34,0.05)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{tile.emoji}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "#3a1f14", marginBottom: "0.375rem" }}>{tile.label}</div>
                <div style={{ fontSize: "0.82rem", color: "#9c7b6e" }}>{tile.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
