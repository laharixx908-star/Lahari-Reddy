import { useLocation } from "wouter";
import { supabase } from "./supabase";
import AdminGuard from "./AdminGuard";
import { T } from "./adminTheme";

const navItems = [
  { emoji: "✏️", label: "Content",    path: "/admin/content"    },
  { emoji: "📝", label: "Blogs",      path: "/admin/blogs"      },
  { emoji: "🚀", label: "Projects",   path: "/admin/projects"   },
  { emoji: "🛠️", label: "Skills",     path: "/admin/skills"     },
  { emoji: "💼", label: "Experience", path: "/admin/experience" },
  { emoji: "🖼️", label: "Gallery",    path: "/admin/gallery"    },
];

export default function AdminShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const [location, navigate] = useLocation();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <AdminGuard>
      <div style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        fontFamily: "system-ui, sans-serif",
      }}>
        {/* ── SIDEBAR ── */}
        <div style={{
          width: "210px",
          flexShrink: 0,
          background: T.bg,
          borderRight: `1px solid ${T.borderMid}`,
          display: "flex",
          flexDirection: "column",
          padding: "1.25rem 0.875rem",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}>
          {/* Logo */}
          <div style={{
            fontFamily: T.serif,
            color: T.textPrimary,
            fontSize: "0.9rem",
            letterSpacing: "0.08em",
            marginBottom: "1.25rem",
            paddingBottom: "0.875rem",
            borderBottom: `1px solid ${T.purpleBorder}`,
            cursor: "pointer",
          }} onClick={() => navigate("/admin/dashboard")}>
            LAHARI CMS
          </div>

          {/* Nav */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
            {navItems.map(item => {
              const isActive = location.startsWith(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  style={{
                    background: isActive ? T.purpleDim : "none",
                    border: "none",
                    borderLeft: isActive ? `2px solid ${T.purple}` : "2px solid transparent",
                    borderRadius: isActive ? "0 6px 6px 0" : "6px",
                    color: isActive ? T.purple : T.textDim,
                    padding: "0.4rem 0.75rem",
                    fontSize: "0.75rem",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = T.textPrimary;
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = T.textDim;
                  }}
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Bottom */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", borderTop: `0.5px solid ${T.borderMid}`, paddingTop: "0.875rem" }}>
            <button
              onClick={() => window.open("/", "_blank")}
              style={{ background: "none", border: "none", color: T.textDim, fontSize: "0.7rem", textAlign: "left", cursor: "pointer", padding: "0.3rem 0.5rem" }}
            >
              ← View Site
            </button>
            <button
              onClick={logout}
              style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.7rem", textAlign: "left", cursor: "pointer", padding: "0.3rem 0.5rem" }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ flex: 1, padding: "2rem 2rem 4rem", overflowY: "auto", minWidth: 0 }}>
          <div style={{ maxWidth: "780px" }}>
            <button
              onClick={() => navigate("/admin/dashboard")}
              style={{ background: "none", border: "none", color: T.textMuted, fontSize: "0.8rem", cursor: "pointer", padding: 0, marginBottom: "0.5rem", display: "block" }}
            >
              ← Dashboard
            </button>
            <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: "1.75rem", color: T.textPrimary, margin: "0 0 0.25rem" }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: "0.8rem", color: T.textMuted, margin: "0 0 2rem" }}>{subtitle}</p>
            )}
            <div style={{ marginTop: subtitle ? 0 : "1.75rem" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}