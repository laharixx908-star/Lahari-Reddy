import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/lib/AdminGuard";
import { T } from "@/lib/adminTheme";
import { useState } from "react";

const tiles = [
  { emoji: "✏️", label: "Content",    desc: "Hero · About · Journey · Goals · Hobbies", path: "/admin/content"    },
  { emoji: "📝", label: "Blogs",      desc: "Write & publish blog posts",                path: "/admin/blogs"      },
  { emoji: "🚀", label: "Projects",   desc: "Add & manage projects",                     path: "/admin/projects"   },
  { emoji: "🛠️", label: "Skills",     desc: "Skills by category",                        path: "/admin/skills"     },
  { emoji: "💼", label: "Experience", desc: "Add & remove experience entries",            path: "/admin/experience" },
  { emoji: "🖼️", label: "Gallery",    desc: "Upload & manage images",                    path: "/admin/gallery"    },
];

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <AdminGuard>
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "system-ui, sans-serif" }}>

        {/* Top bar */}
        <div style={{ borderBottom: `0.5px solid ${T.borderMid}`, padding: "0 2rem", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: T.serif, color: T.textPrimary, fontSize: "0.9rem", letterSpacing: "0.08em" }}>
            LAHARI CMS
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => window.open("/", "_blank")}
              style={{ background: "none", border: `0.5px solid ${T.borderMid}`, borderRadius: "6px", color: T.textMuted, fontSize: "0.72rem", padding: "0.35rem 0.875rem", cursor: "pointer" }}
            >
              ← View Site
            </button>
            <button
              onClick={logout}
              style={{ background: T.dangerBg, border: `0.5px solid #ef444430`, borderRadius: "6px", color: T.danger, fontSize: "0.72rem", padding: "0.35rem 0.875rem", cursor: "pointer" }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Hero */}
        <div style={{ padding: "3rem 2rem 1.5rem" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: T.purple, margin: "0 0 0.5rem" }}>
            Welcome back
          </p>
          <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: "2rem", color: T.textPrimary, margin: "0 0 0.375rem" }}>
            Dashboard
          </h1>
          <p style={{ fontSize: "0.82rem", color: T.textMuted, margin: 0 }}>
            Select a section to manage
          </p>
        </div>

        {/* Divider */}
        <div style={{ margin: "0 2rem 2rem", height: "0.5px", background: `linear-gradient(to right, ${T.purple}60, transparent)` }} />

        {/* Grid */}
        <div style={{ padding: "0 2rem 3rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem", maxWidth: "960px" }}>
          {tiles.map((tile, i) => (
            <button
              key={tile.path}
              onClick={() => navigate(tile.path)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                background: hoveredIdx === i ? "#0f0f0f" : T.bgSurface,
                border: hoveredIdx === i ? `0.5px solid ${T.borderBright}` : `0.5px solid ${T.purpleBorder}`,
                borderRadius: "14px",
                padding: "1.75rem 1.5rem",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Purple corner accent on hover */}
              {hoveredIdx === i && (
                <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: `radial-gradient(circle at top right, ${T.purple}20, transparent 70%)`, borderRadius: "0 14px 0 0", pointerEvents: "none" }} />
              )}
              <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{tile.emoji}</div>
              <div style={{ fontFamily: T.serif, fontSize: "1.1rem", color: T.textPrimary, marginBottom: "0.375rem" }}>{tile.label}</div>
              <div style={{ fontSize: "0.75rem", color: T.textMuted, lineHeight: 1.5 }}>{tile.desc}</div>
              <div style={{ marginTop: "1.25rem", fontSize: "0.7rem", color: hoveredIdx === i ? T.purple : T.textDim, transition: "color 0.2s" }}>
                Open →
              </div>
            </button>
          ))}
        </div>

      </div>
    </AdminGuard>
  );
}