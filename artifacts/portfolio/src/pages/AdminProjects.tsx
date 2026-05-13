import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/lib/AdminGuard";

type Project = { id: string; title: string; short_desc: string; tag: string; link: string; link_label: string; status: string };
const empty = { title: "", short_desc: "", tag: "", tag_color: "#f5ede8", tag_text_color: "#8a4a3a", link: "", link_label: "Visit Project", status: "active", order_index: 0 };

export default function AdminProjects() {
  const [list, setList] = useState<Project[]>([]);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    supabase.from("projects").select("*").order("order_index")
      .then(({ data }) => setList(data || []));
  }, []);

  const save = async () => {
    if (!form.title.trim()) return alert("Title is required.");
    setSaving(true);
    const { data, error } = await supabase.from("projects").insert(form).select();
    if (error) { alert(error.message); setSaving(false); return; }
    setList(prev => [...prev, data![0]]);
    setForm(empty);
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    setList(prev => prev.filter(p => p.id !== id));
  };

  const fields: [keyof typeof empty, string][] = [
    ["title", "Project Title"], ["short_desc", "Short Description"],
    ["tag", "Tag (e.g. Hardware, AI)"], ["link", "Project URL"],
    ["link_label", "Button Label"],
  ];

  return (
    <AdminGuard>
      <div style={{ minHeight: "100vh", background: "#fdf8f6", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <button onClick={() => navigate("/admin/dashboard")} style={{ background: "none", border: "none", color: "#9c7b6e", cursor: "pointer", fontSize: "0.85rem", padding: 0, marginBottom: "0.5rem", display: "block" }}>← Dashboard</button>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.8rem", color: "#3a1f14", marginBottom: "1.75rem" }}>Projects</h1>

          <div style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "14px", padding: "1.75rem", marginBottom: "1.75rem" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "1.25rem" }}>Add New Project</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {fields.map(([key, label]) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>{label}</label>
                  {key === "short_desc" ? (
                    <textarea value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} rows={3}
                      style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box", outline: "none", resize: "vertical" }} />
                  ) : (
                    <input type="text" value={form[key] as string} onChange={e => setForm({ ...form, [key]: e.target.value })}
                      style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }} />
                  )}
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", background: "#fff" }}>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>
            <button onClick={save} disabled={saving}
              style={{ marginTop: "1.25rem", background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.65rem 1.5rem", cursor: "pointer", fontSize: "0.85rem" }}>
              {saving ? "Adding..." : "Add Project"}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {list.map(proj => (
              <div key={proj.id} style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#3a1f14", margin: "0 0 0.25rem" }}>{proj.title}</p>
                  <p style={{ fontSize: "0.8rem", color: "#9c7b6e", margin: "0 0 0.25rem" }}>{proj.tag} · {proj.status}</p>
                  <p style={{ fontSize: "0.82rem", color: "#5c3022", margin: 0 }}>{proj.short_desc?.slice(0, 80)}...</p>
                </div>
                <button onClick={() => remove(proj.id)} style={{ background: "#fdecea", color: "#c0392b", border: "none", borderRadius: "6px", padding: "0.375rem 0.75rem", cursor: "pointer", fontSize: "0.75rem", flexShrink: 0 }}>Delete</button>
              </div>
            ))}
            {list.length === 0 && <p style={{ color: "#9c7b6e", textAlign: "center", padding: "2rem" }}>No projects added yet.</p>}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}