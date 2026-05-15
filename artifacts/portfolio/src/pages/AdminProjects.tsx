import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/lib/AdminShell";
import { T, inputStyle, labelStyle, cardStyle, btnPrimary, btnDanger } from "@/lib/adminTheme";

type Project = { id: string; title: string; short_desc: string; tag: string; link: string; link_label: string; status: string };
const empty = { title: "", short_desc: "", tag: "", tag_color: "#f5ede8", tag_text_color: "#8a4a3a", link: "", link_label: "Visit Project", status: "active", order_index: 0 };

export default function AdminProjects() {
  const [list, setList]   = useState<Project[]>([]);
  const [form, setForm]   = useState(empty);
  const [saving, setSaving] = useState(false);

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
    setForm(empty); setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    setList(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AdminShell title="Projects" subtitle="Add and manage portfolio projects">
      <div style={{ ...cardStyle, marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginBottom: "1.125rem" }}>Add New Project</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {([["title", "Project Title"], ["tag", "Tag (e.g. Hardware, AI)"]] as [string, string][]).map(([key, label]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input type="text" value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
            </div>
          ))}
          <div>
            <label style={labelStyle}>Short Description</label>
            <textarea value={form.short_desc} onChange={e => setForm({ ...form, short_desc: e.target.value })} rows={3}
              style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <div>
            <label style={labelStyle}>Project URL</label>
            <input type="text" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
              style={{ ...inputStyle, appearance: "none" }}>
              <option value="active"    style={{ background: "#0a0a0a", color: "#ddd6fe" }}>Active</option>
              <option value="upcoming"  style={{ background: "#0a0a0a", color: "#ddd6fe" }}>Upcoming</option>
            </select>
          </div>
        </div>
        <button onClick={save} disabled={saving} style={{ ...btnPrimary, marginTop: "1.25rem" }}>
          {saving ? "Adding..." : "Add Project"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {list.map(proj => (
          <div key={proj.id} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
            <div>
              <p style={{ fontFamily: T.serif, fontSize: "0.95rem", color: T.textPrimary, margin: "0 0 0.25rem" }}>{proj.title}</p>
              <p style={{ fontSize: "0.75rem", color: T.purple, margin: "0 0 0.25rem" }}>{proj.tag} · {proj.status}</p>
              <p style={{ fontSize: "0.78rem", color: T.textMuted, margin: 0 }}>{proj.short_desc?.slice(0, 90)}{proj.short_desc?.length > 90 ? "..." : ""}</p>
            </div>
            <button onClick={() => remove(proj.id)} style={btnDanger}>Delete</button>
          </div>
        ))}
        {list.length === 0 && <p style={{ color: T.textDim, textAlign: "center", padding: "2rem", fontSize: "0.875rem" }}>No projects yet.</p>}
      </div>
    </AdminShell>
  );
}