import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/lib/AdminShell";
import { T, inputStyle, labelStyle, cardStyle, btnPrimary, btnDanger } from "@/lib/adminTheme";

type Exp = { id: string; company: string; role: string; duration: string; description: string };
const empty = { company: "", role: "", duration: "", description: "", order_index: 0 };

export default function AdminExperience() {
  const [list, setList]   = useState<Exp[]>([]);
  const [form, setForm]   = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("experience").select("*").order("order_index")
      .then(({ data }) => setList(data || []));
  }, []);

  const save = async () => {
    if (!form.company || !form.role) return alert("Company and role are required.");
    setSaving(true);
    const { data, error } = await supabase.from("experience").insert(form).select();
    if (error) { alert(error.message); setSaving(false); return; }
    setList(prev => [...prev, data![0]]);
    setForm(empty); setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    await supabase.from("experience").delete().eq("id", id);
    setList(prev => prev.filter(e => e.id !== id));
  };

  return (
    <AdminShell title="Experience" subtitle="Add and manage experience entries">
      <div style={{ ...cardStyle, marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginBottom: "1.125rem" }}>Add New Entry</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          {(["company", "role", "duration"] as const).map(field => (
            <div key={field} style={{ gridColumn: field === "duration" ? "span 2" : "auto" }}>
              <label style={labelStyle}>{field}</label>
              <input type="text" value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={inputStyle} />
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Description</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
            style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <button onClick={save} disabled={saving} style={btnPrimary}>
          {saving ? "Adding..." : "Add Experience"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {list.map(exp => (
          <div key={exp.id} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
            <div>
              <p style={{ fontFamily: T.serif, fontSize: "0.95rem", color: T.textPrimary, margin: "0 0 0.25rem" }}>{exp.role}</p>
              <p style={{ fontSize: "0.78rem", color: T.purple, margin: "0 0 0.25rem" }}>{exp.company} {exp.duration ? `· ${exp.duration}` : ""}</p>
              <p style={{ fontSize: "0.78rem", color: T.textMuted, margin: 0 }}>{exp.description}</p>
            </div>
            <button onClick={() => remove(exp.id)} style={btnDanger}>Delete</button>
          </div>
        ))}
        {list.length === 0 && <p style={{ color: T.textDim, textAlign: "center", padding: "2rem", fontSize: "0.875rem" }}>No experience entries yet.</p>}
      </div>
    </AdminShell>
  );
}