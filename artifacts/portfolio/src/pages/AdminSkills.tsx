import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/lib/AdminGuard";

type Skill = { id: string; category: string; name: string; is_exploring: boolean; order_index: number };
const categories = ["Core", "Tools", "Hardware"];
const empty = { category: "Core", name: "", is_exploring: false, order_index: 0 };

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [, navigate] = useLocation();

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
    setForm(empty);
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await supabase.from("skills").delete().eq("id", id);
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <AdminGuard>
      <div style={{ minHeight: "100vh", background: "#fdf8f6", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <button onClick={() => navigate("/admin/dashboard")} style={{ background: "none", border: "none", color: "#9c7b6e", cursor: "pointer", fontSize: "0.85rem", padding: 0, marginBottom: "0.5rem", display: "block" }}>← Dashboard</button>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.8rem", color: "#3a1f14", marginBottom: "1.75rem" }}>Skills</h1>

          <div style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "14px", padding: "1.75rem", marginBottom: "1.75rem" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "1.25rem" }}>Add New Skill</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", background: "#fff" }}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>Skill Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Python"
                  style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }} />
              </div>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#5c3022", cursor: "pointer", marginBottom: "1.25rem" }}>
              <input type="checkbox" checked={form.is_exploring} onChange={e => setForm({ ...form, is_exploring: e.target.checked })} />
              Mark as "Currently Exploring"
            </label>
            <button onClick={save} disabled={saving}
              style={{ background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.65rem 1.5rem", cursor: "pointer", fontSize: "0.85rem" }}>
              {saving ? "Adding..." : "Add Skill"}
            </button>
          </div>

          {categories.map(cat => (
            <div key={cat} style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "14px", padding: "1.5rem", marginBottom: "1rem" }}>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "1rem" }}>{cat}</p>
              {grouped[cat]?.length === 0 && <p style={{ color: "#c4a99e", fontSize: "0.85rem" }}>No skills yet.</p>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {grouped[cat]?.map(skill => (
                  <div key={skill.id} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#f8f3f1", border: "0.5px solid #e8ddd9", borderRadius: "999px", padding: "0.3rem 0.875rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#3a1f14" }}>{skill.name}</span>
                    {skill.is_exploring && <span style={{ fontSize: "0.65rem", color: "#9c7b6e" }}>· exploring</span>}
                    <button onClick={() => remove(skill.id)} style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer", fontSize: "0.75rem", padding: "0 0.25rem", lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  );
}