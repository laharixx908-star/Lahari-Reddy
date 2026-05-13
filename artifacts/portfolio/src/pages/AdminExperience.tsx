import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/lib/AdminGuard";

type Exp = { id: string; company: string; role: string; duration: string; description: string; order_index: number };
const empty = { company: "", role: "", duration: "", description: "", order_index: 0 };

export default function AdminExperience() {
  const [list, setList] = useState<Exp[]>([]);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [, navigate] = useLocation();

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
    setForm(empty);
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    await supabase.from("experience").delete().eq("id", id);
    setList(prev => prev.filter(e => e.id !== id));
  };

  const field = (key: keyof typeof empty, label: string, multiline = false) => (
    <div key={key}>
      <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>{label}</label>
      {multiline ? (
        <textarea value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} rows={3}
          style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box", outline: "none", resize: "vertical" }} />
      ) : (
        <input type="text" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
          style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }} />
      )}
    </div>
  );

  return (
    <AdminGuard>
      <div style={{ minHeight: "100vh", background: "#fdf8f6", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <button onClick={() => navigate("/admin/dashboard")} style={{ background: "none", border: "none", color: "#9c7b6e", cursor: "pointer", fontSize: "0.85rem", padding: 0, marginBottom: "0.5rem", display: "block" }}>← Dashboard</button>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.8rem", color: "#3a1f14", marginBottom: "1.75rem" }}>Experience</h1>

          <div style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "14px", padding: "1.75rem", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "1.25rem" }}>Add New Entry</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {field("company", "Company / Organization")}
              {field("role", "Role / Title")}
              {field("duration", "Duration (e.g. Jan 2024 – Present)")}
              {field("order_index" as any, "Order (0 = first)")}
            </div>
            <div style={{ marginTop: "1rem" }}>{field("description", "Description", true)}</div>
            <button onClick={save} disabled={saving}
              style={{ marginTop: "1.25rem", background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.65rem 1.5rem", cursor: "pointer", fontSize: "0.85rem" }}>
              {saving ? "Adding..." : "Add Experience"}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {list.map(exp => (
              <div key={exp.id} style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#3a1f14", margin: "0 0 0.25rem" }}>{exp.role}</p>
                  <p style={{ fontSize: "0.82rem", color: "#9c7b6e", margin: "0 0 0.25rem" }}>{exp.company} · {exp.duration}</p>
                  <p style={{ fontSize: "0.82rem", color: "#5c3022", margin: 0 }}>{exp.description}</p>
                </div>
                <button onClick={() => remove(exp.id)} style={{ background: "#fdecea", color: "#c0392b", border: "none", borderRadius: "6px", padding: "0.375rem 0.75rem", cursor: "pointer", fontSize: "0.75rem", flexShrink: 0 }}>
                  Delete
                </button>
              </div>
            ))}
            {list.length === 0 && <p style={{ color: "#9c7b6e", textAlign: "center", padding: "2rem" }}>No experience entries yet.</p>}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
