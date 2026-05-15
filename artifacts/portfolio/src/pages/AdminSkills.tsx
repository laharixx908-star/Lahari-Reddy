import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/lib/AdminShell";
import { T, inputStyle, labelStyle, cardStyle, btnPrimary, btnDanger } from "@/lib/adminTheme";

type Skill = { id: string; category: string; name: string; is_exploring: boolean };
const CATS = ["Core", "Tools", "Hardware"];
const empty = { category: "Core", name: "", is_exploring: false, order_index: 0 };

export default function AdminSkills() {
  const [skills, setSkills]   = useState<Skill[]>([]);
  const [form, setForm]       = useState(empty);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    supabase.from("skills").select("*").order("order_index")
      .then(({ data }) => setSkills(data || []));
  }, []);

  const save = async () => {
    if (!form.name.trim()) return alert("Skill name is required.");
    setSaving(true);
    const { data, error } = await supabase.from("skills").insert(form).select();
    if (error) { alert(error.message); setSaving(false); return; }
    setSkills(prev => [...prev, data![0]]);
    setForm(empty); setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await supabase.from("skills").delete().eq("id", id);
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  return (
    <AdminShell title="Skills" subtitle="Add skills by category">
      <div style={{ ...cardStyle, marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginBottom: "1.125rem" }}>Add New Skill</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={labelStyle}>Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              style={{ ...inputStyle, appearance: "none" }}>
              {CATS.map(c => <option key={c} value={c} style={{ background: "#0a0a0a", color: "#ddd6fe" }}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Skill Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Python" style={inputStyle} />
          </div>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: T.textMuted, cursor: "pointer", marginBottom: "1.25rem" }}>
          <input type="checkbox" checked={form.is_exploring} onChange={e => setForm({ ...form, is_exploring: e.target.checked })} style={{ accentColor: T.purple }} />
          Mark as "Currently Exploring"
        </label>
        <button onClick={save} disabled={saving} style={btnPrimary}>
          {saving ? "Adding..." : "Add Skill"}
        </button>
      </div>

      {CATS.map(cat => (
        <div key={cat} style={{ ...cardStyle, marginBottom: "0.875rem" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.purple, marginBottom: "1rem" }}>{cat}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {skills.filter(s => s.category === cat).length === 0 && (
              <p style={{ color: T.textDim, fontSize: "0.8rem" }}>No skills yet.</p>
            )}
            {skills.filter(s => s.category === cat).map(skill => (
              <div key={skill.id} style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: T.purpleDim, border: `0.5px solid ${T.purpleBorder}`, borderRadius: "999px", padding: "0.3rem 0.75rem" }}>
                <span style={{ fontSize: "0.8rem", color: T.textPrimary }}>{skill.name}</span>
                {skill.is_exploring && <span style={{ fontSize: "0.62rem", color: T.textMuted }}>· exploring</span>}
                <button onClick={() => remove(skill.id)} style={{ background: "none", border: "none", color: T.danger, cursor: "pointer", fontSize: "0.8rem", padding: "0 0.125rem", lineHeight: 1 }}>×</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </AdminShell>
  );
}