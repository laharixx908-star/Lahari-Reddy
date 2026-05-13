import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/lib/AdminGuard";

export default function AdminContent() {
  const [tab, setTab] = useState<"hero"|"about"|"journey"|"goals"|"hobbies">("hero");
  const [, navigate] = useLocation();

  // ── HERO ──
  const [hero, setHero] = useState({ name: "", tagline: "", subtitle: "", email: "", github_url: "", linkedin_url: "" });
  const [heroSaving, setHeroSaving] = useState(false);
  const [heroId, setHeroId] = useState<string|null>(null);

  useEffect(() => {
    supabase.from("hero").select("*").limit(1).then(({ data }) => {
      if (data && data[0]) { setHero(data[0]); setHeroId(data[0].id); }
    });
  }, []);

  const saveHero = async () => {
    setHeroSaving(true);
    if (heroId) {
      await supabase.from("hero").update(hero).eq("id", heroId);
    } else {
      const { data } = await supabase.from("hero").insert(hero).select();
      if (data) setHeroId(data[0].id);
    }
    setHeroSaving(false);
    alert("Hero saved!");
  };

  // ── ABOUT ──
  const [about, setAbout] = useState<{id?:string; label:string; text:string; order_index:number}[]>([]);
  const [aboutSaving, setAboutSaving] = useState(false);

  useEffect(() => {
    supabase.from("about").select("*").order("order_index")
      .then(({ data }) => {
        if (data && data.length > 0) setAbout(data);
        else setAbout([
          { label: "The Spark", text: "", order_index: 0 },
          { label: "How I Work", text: "", order_index: 1 },
          { label: "What Drives Me", text: "", order_index: 2 },
        ]);
      });
  }, []);

  const saveAbout = async () => {
    setAboutSaving(true);
    for (const item of about) {
      if (item.id) {
        await supabase.from("about").update({ label: item.label, text: item.text }).eq("id", item.id);
      } else {
        const { data } = await supabase.from("about").insert(item).select();
        if (data) item.id = data[0].id;
      }
    }
    setAboutSaving(false);
    alert("About saved!");
  };

  // ── JOURNEY ──
  const [journey, setJourney] = useState<{id?:string; type:string; content:string; order_index:number}[]>([]);
  const [journeySaving, setJourneySaving] = useState(false);

  useEffect(() => {
    supabase.from("journey").select("*").order("order_index")
      .then(({ data }) => { if (data && data.length > 0) setJourney(data); });
  }, []);

  const addJourneyPara = () => setJourney(prev => [...prev, { type: "paragraph", content: "", order_index: prev.length }]);
  const removeJourney = async (idx: number) => {
    const item = journey[idx];
    if (item.id) await supabase.from("journey").delete().eq("id", item.id);
    setJourney(prev => prev.filter((_, i) => i !== idx));
  };
  const saveJourney = async () => {
    setJourneySaving(true);
    for (const item of journey) {
      if (item.id) {
        await supabase.from("journey").update({ content: item.content, type: item.type }).eq("id", item.id);
      } else {
        const { data } = await supabase.from("journey").insert(item).select();
        if (data) item.id = data[0].id;
      }
    }
    setJourneySaving(false);
    alert("Journey saved!");
  };

  // ── GOALS ──
  const [goals, setGoals] = useState<{id?:string; badge:string; description:string; order_index:number}[]>([]);
  const [goalsSaving, setGoalsSaving] = useState(false);

  useEffect(() => {
    supabase.from("future_goals").select("*").order("order_index")
      .then(({ data }) => { if (data && data.length > 0) setGoals(data); });
  }, []);

  const addGoal = () => setGoals(prev => [...prev, { badge: "", description: "", order_index: prev.length }]);
  const removeGoal = async (idx: number) => {
    const item = goals[idx];
    if (item.id) await supabase.from("future_goals").delete().eq("id", item.id);
    setGoals(prev => prev.filter((_, i) => i !== idx));
  };
  const saveGoals = async () => {
    setGoalsSaving(true);
    for (const item of goals) {
      if (item.id) {
        await supabase.from("future_goals").update({ badge: item.badge, description: item.description }).eq("id", item.id);
      } else {
        const { data } = await supabase.from("future_goals").insert(item).select();
        if (data) item.id = data[0].id;
      }
    }
    setGoalsSaving(false);
    alert("Goals saved!");
  };

  // ── HOBBIES ──
  const [hobbies, setHobbies] = useState<{id?:string; title:string; description:string; badge:string; order_index:number}[]>([]);
  const [hobbiesSaving, setHobbiesSaving] = useState(false);

  useEffect(() => {
    supabase.from("hobbies").select("*").order("order_index")
      .then(({ data }) => { if (data && data.length > 0) setHobbies(data); });
  }, []);

  const addHobby = () => setHobbies(prev => [...prev, { title: "", description: "", badge: "", order_index: prev.length }]);
  const removeHobby = async (idx: number) => {
    const item = hobbies[idx];
    if (item.id) await supabase.from("hobbies").delete().eq("id", item.id);
    setHobbies(prev => prev.filter((_, i) => i !== idx));
  };
  const saveHobbies = async () => {
    setHobbiesSaving(true);
    for (const item of hobbies) {
      if (item.id) {
        await supabase.from("hobbies").update({ title: item.title, description: item.description, badge: item.badge }).eq("id", item.id);
      } else {
        const { data } = await supabase.from("hobbies").insert(item).select();
        if (data) item.id = data[0].id;
      }
    }
    setHobbiesSaving(false);
    alert("Hobbies saved!");
  };

  const inputStyle = { width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box" as const, outline: "none" };
  const labelStyle = { display: "block" as const, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#9c7b6e", marginBottom: "0.4rem" };
  const tabs = ["hero", "about", "journey", "goals", "hobbies"] as const;

  return (
    <AdminGuard>
      <div style={{ minHeight: "100vh", background: "#fdf8f6", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <button onClick={() => navigate("/admin/dashboard")} style={{ background: "none", border: "none", color: "#9c7b6e", cursor: "pointer", fontSize: "0.85rem", padding: 0, marginBottom: "0.5rem", display: "block" }}>← Dashboard</button>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.8rem", color: "#3a1f14", marginBottom: "1.5rem" }}>Content Editor</h1>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, borderBottom: "0.5px solid #e8ddd9", marginBottom: "1.75rem", overflowX: "auto" }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding: "0.5rem 1.25rem", border: "none", background: "none", cursor: "pointer", fontSize: "0.82rem", color: tab === t ? "#5c3022" : "#9c7b6e", borderBottom: tab === t ? "2px solid #5c3022" : "2px solid transparent", fontWeight: tab === t ? 600 : 400, whiteSpace: "nowrap" as const, textTransform: "capitalize" as const }}>
                {t}
              </button>
            ))}
          </div>

          {/* HERO */}
          {tab === "hero" && (
            <div style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "14px", padding: "1.75rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {(["name","tagline","subtitle","email","github_url","linkedin_url"] as const).map(key => (
                  <div key={key}>
                    <label style={labelStyle}>{key.replace(/_/g, " ")}</label>
                    <input type="text" value={hero[key]} onChange={e => setHero({ ...hero, [key]: e.target.value })} style={inputStyle} />
                  </div>
                ))}
              </div>
              <button onClick={saveHero} disabled={heroSaving}
                style={{ marginTop: "1.25rem", background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.65rem 1.5rem", cursor: "pointer", fontSize: "0.85rem" }}>
                {heroSaving ? "Saving..." : "Save Hero"}
              </button>
            </div>
          )}

          {/* ABOUT */}
          {tab === "about" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {about.map((item, i) => (
                <div key={i} style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "14px", padding: "1.5rem" }}>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <label style={labelStyle}>Label</label>
                    <input type="text" value={item.label} onChange={e => { const a = [...about]; a[i].label = e.target.value; setAbout(a); }} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Text</label>
                    <textarea value={item.text} onChange={e => { const a = [...about]; a[i].text = e.target.value; setAbout(a); }} rows={3}
                      style={{ ...inputStyle, resize: "vertical" as const }} />
                  </div>
                </div>
              ))}
              <button onClick={saveAbout} disabled={aboutSaving}
                style={{ background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.65rem 1.5rem", cursor: "pointer", fontSize: "0.85rem", alignSelf: "flex-start" }}>
                {aboutSaving ? "Saving..." : "Save About"}
              </button>
            </div>
          )}

          {/* JOURNEY */}
          {tab === "journey" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {journey.map((item, i) => (
                <div key={i} style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "12px", padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <select value={item.type} onChange={e => { const j = [...journey]; j[i].type = e.target.value; setJourney(j); }}
                      style={{ padding: "0.4rem 0.75rem", border: "0.5px solid #e8ddd9", borderRadius: "6px", fontSize: "0.8rem", background: "#fff" }}>
                      <option value="paragraph">Paragraph</option>
                      <option value="quote">Closing Quote</option>
                    </select>
                    <button onClick={() => removeJourney(i)} style={{ background: "#fdecea", color: "#c0392b", border: "none", borderRadius: "6px", padding: "0.3rem 0.75rem", cursor: "pointer", fontSize: "0.75rem" }}>Delete</button>
                  </div>
                  <textarea value={item.content} onChange={e => { const j = [...journey]; j[i].content = e.target.value; setJourney(j); }} rows={4}
                    style={{ ...inputStyle, resize: "vertical" as const }} />
                </div>
              ))}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={addJourneyPara} style={{ background: "#f8f3f1", color: "#5c3022", border: "0.5px solid #e8ddd9", borderRadius: "8px", padding: "0.65rem 1.25rem", cursor: "pointer", fontSize: "0.85rem" }}>+ Add Paragraph</button>
                <button onClick={saveJourney} disabled={journeySaving}
                  style={{ background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.65rem 1.5rem", cursor: "pointer", fontSize: "0.85rem" }}>
                  {journeySaving ? "Saving..." : "Save Journey"}
                </button>
              </div>
            </div>
          )}

          {/* GOALS */}
          {tab === "goals" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {goals.map((item, i) => (
                <div key={i} style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "12px", padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <input type="text" value={item.badge} onChange={e => { const g = [...goals]; g[i].badge = e.target.value; setGoals(g); }} placeholder="Badge (e.g. Career Goal)"
                      style={{ ...inputStyle, width: "60%" }} />
                    <button onClick={() => removeGoal(i)} style={{ background: "#fdecea", color: "#c0392b", border: "none", borderRadius: "6px", padding: "0.3rem 0.75rem", cursor: "pointer", fontSize: "0.75rem" }}>Delete</button>
                  </div>
                  <textarea value={item.description} onChange={e => { const g = [...goals]; g[i].description = e.target.value; setGoals(g); }} rows={3} placeholder="Goal description..."
                    style={{ ...inputStyle, resize: "vertical" as const }} />
                </div>
              ))}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={addGoal} style={{ background: "#f8f3f1", color: "#5c3022", border: "0.5px solid #e8ddd9", borderRadius: "8px", padding: "0.65rem 1.25rem", cursor: "pointer", fontSize: "0.85rem" }}>+ Add Goal</button>
                <button onClick={saveGoals} disabled={goalsSaving}
                  style={{ background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.65rem 1.5rem", cursor: "pointer", fontSize: "0.85rem" }}>
                  {goalsSaving ? "Saving..." : "Save Goals"}
                </button>
              </div>
            </div>
          )}

          {/* HOBBIES */}
          {tab === "hobbies" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {hobbies.map((item, i) => (
                <div key={i} style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "12px", padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", gap: "0.75rem" }}>
                    <input type="text" value={item.title} onChange={e => { const h = [...hobbies]; h[i].title = e.target.value; setHobbies(h); }} placeholder="Title (e.g. Basketball)"
                      style={{ ...inputStyle, flex: 1 }} />
                    <input type="text" value={item.badge} onChange={e => { const h = [...hobbies]; h[i].badge = e.target.value; setHobbies(h); }} placeholder="Badge (optional)"
                      style={{ ...inputStyle, width: "30%" }} />
                    <button onClick={() => removeHobby(i)} style={{ background: "#fdecea", color: "#c0392b", border: "none", borderRadius: "6px", padding: "0.3rem 0.75rem", cursor: "pointer", fontSize: "0.75rem", flexShrink: 0 }}>Delete</button>
                  </div>
                  <input type="text" value={item.description} onChange={e => { const h = [...hobbies]; h[i].description = e.target.value; setHobbies(h); }} placeholder="Description"
                    style={inputStyle} />
                </div>
              ))}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={addHobby} style={{ background: "#f8f3f1", color: "#5c3022", border: "0.5px solid #e8ddd9", borderRadius: "8px", padding: "0.65rem 1.25rem", cursor: "pointer", fontSize: "0.85rem" }}>+ Add Hobby</button>
                <button onClick={saveHobbies} disabled={hobbiesSaving}
                  style={{ background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.65rem 1.5rem", cursor: "pointer", fontSize: "0.85rem" }}>
                  {hobbiesSaving ? "Saving..." : "Save Hobbies"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </AdminGuard>
  );
}