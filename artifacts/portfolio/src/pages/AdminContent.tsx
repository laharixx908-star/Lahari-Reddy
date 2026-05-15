import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/lib/AdminShell";
import { T, inputStyle, labelStyle, cardStyle, btnPrimary, btnSecondary, btnDanger } from "@/lib/adminTheme";

type Tab = "hero" | "about" | "journey" | "goals" | "hobbies";

export default function AdminContent() {
  const [tab, setTab] = useState<Tab>("hero");

  const [hero, setHero]     = useState({ name: "", tagline: "", subtitle: "", email: "", github_url: "", linkedin_url: "" });
  const [heroId, setHeroId] = useState<string | null>(null);
  const [heroSaving, setHeroSaving] = useState(false);

  const [about, setAbout]         = useState<{ id?: string; label: string; text: string; order_index: number }[]>([]);
  const [aboutSaving, setAboutSaving] = useState(false);

  const [journey, setJourney]         = useState<{ id?: string; type: string; content: string; order_index: number }[]>([]);
  const [journeySaving, setJourneySaving] = useState(false);

  const [goals, setGoals]         = useState<{ id?: string; badge: string; description: string; order_index: number }[]>([]);
  const [goalsSaving, setGoalsSaving] = useState(false);

  const [hobbies, setHobbies]         = useState<{ id?: string; title: string; description: string; badge: string; order_index: number }[]>([]);
  const [hobbiesSaving, setHobbiesSaving] = useState(false);

  useEffect(() => {
    supabase.from("hero").select("*").limit(1).then(({ data }) => { if (data?.[0]) { setHero(data[0]); setHeroId(data[0].id); } });
    supabase.from("about").select("*").order("order_index").then(({ data }) => { if (data?.length) setAbout(data); else setAbout([{ label: "The Spark", text: "", order_index: 0 }, { label: "How I Work", text: "", order_index: 1 }, { label: "What Drives Me", text: "", order_index: 2 }]); });
    supabase.from("journey").select("*").order("order_index").then(({ data }) => { if (data?.length) setJourney(data); });
    supabase.from("future_goals").select("*").order("order_index").then(({ data }) => { if (data?.length) setGoals(data); });
    supabase.from("hobbies").select("*").order("order_index").then(({ data }) => { if (data?.length) setHobbies(data); });
  }, []);

  const saveHero = async () => {
    setHeroSaving(true);
    if (heroId) await supabase.from("hero").update(hero).eq("id", heroId);
    else { const { data } = await supabase.from("hero").insert(hero).select(); if (data) setHeroId(data[0].id); }
    setHeroSaving(false); alert("Hero saved!");
  };

  const saveAbout = async () => {
    setAboutSaving(true);
    for (const item of about) {
      if (item.id) await supabase.from("about").update({ label: item.label, text: item.text }).eq("id", item.id);
      else { const { data } = await supabase.from("about").insert(item).select(); if (data) item.id = data[0].id; }
    }
    setAboutSaving(false); alert("About saved!");
  };

  const saveJourney = async () => {
    setJourneySaving(true);
    for (const item of journey) {
      if (item.id) await supabase.from("journey").update({ content: item.content, type: item.type }).eq("id", item.id);
      else { const { data } = await supabase.from("journey").insert(item).select(); if (data) item.id = data[0].id; }
    }
    setJourneySaving(false); alert("Journey saved!");
  };

  const saveGoals = async () => {
    setGoalsSaving(true);
    for (const item of goals) {
      if (item.id) await supabase.from("future_goals").update({ badge: item.badge, description: item.description }).eq("id", item.id);
      else { const { data } = await supabase.from("future_goals").insert(item).select(); if (data) item.id = data[0].id; }
    }
    setGoalsSaving(false); alert("Goals saved!");
  };

  const saveHobbies = async () => {
    setHobbiesSaving(true);
    for (const item of hobbies) {
      if (item.id) await supabase.from("hobbies").update({ title: item.title, description: item.description, badge: item.badge }).eq("id", item.id);
      else { const { data } = await supabase.from("hobbies").insert(item).select(); if (data) item.id = data[0].id; }
    }
    setHobbiesSaving(false); alert("Hobbies saved!");
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "hero",    label: "Hero"    },
    { key: "about",   label: "About"   },
    { key: "journey", label: "Journey" },
    { key: "goals",   label: "Goals"   },
    { key: "hobbies", label: "Hobbies" },
  ];

  const tabBtn = (t: Tab) => ({
    padding: "0.45rem 1.125rem", border: "none", background: "none", cursor: "pointer",
    fontSize: "0.78rem", color: tab === t ? T.purple : T.textMuted,
    borderBottom: tab === t ? `2px solid ${T.purple}` : "2px solid transparent",
    fontWeight: tab === t ? 500 : 400,
    whiteSpace: "nowrap",
  } as React.CSSProperties);

  return (
    <AdminShell title="Content Editor" subtitle="Edit every section of your portfolio">

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: `0.5px solid ${T.borderMid}`, marginBottom: "1.75rem", overflowX: "auto" }}>
        {tabs.map(t => <button key={t.key} onClick={() => setTab(t.key)} style={tabBtn(t.key)}>{t.label}</button>)}
      </div>

      {/* HERO */}
      {tab === "hero" && (
        <div style={cardStyle}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {(["name", "tagline", "subtitle", "email", "github_url", "linkedin_url"] as const).map(key => (
              <div key={key}>
                <label style={labelStyle}>{key.replace(/_/g, " ")}</label>
                <input type="text" value={hero[key]} onChange={e => setHero({ ...hero, [key]: e.target.value })} style={inputStyle} />
              </div>
            ))}
          </div>
          <button onClick={saveHero} disabled={heroSaving} style={{ ...btnPrimary, marginTop: "1.25rem" }}>
            {heroSaving ? "Saving..." : "Save Hero"}
          </button>
        </div>
      )}

      {/* ABOUT */}
      {tab === "about" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {about.map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ marginBottom: "0.875rem" }}>
                <label style={labelStyle}>Label</label>
                <input type="text" value={item.label} onChange={e => { const a = [...about]; a[i].label = e.target.value; setAbout(a); }} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Text</label>
                <textarea value={item.text} onChange={e => { const a = [...about]; a[i].text = e.target.value; setAbout(a); }} rows={3}
                  style={{ ...inputStyle, resize: "vertical" }} />
              </div>
            </div>
          ))}
          <button onClick={saveAbout} disabled={aboutSaving} style={{ ...btnPrimary, alignSelf: "flex-start" }}>
            {aboutSaving ? "Saving..." : "Save About"}
          </button>
        </div>
      )}

      {/* JOURNEY */}
      {tab === "journey" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {journey.map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <select value={item.type} onChange={e => { const j = [...journey]; j[i].type = e.target.value; setJourney(j); }}
                  style={{ ...inputStyle, width: "auto", appearance: "none", paddingRight: "1.5rem" }}>
                  <option value="paragraph" style={{ background: "#0a0a0a", color: "#ddd6fe" }}>Paragraph</option>
                  <option value="quote"     style={{ background: "#0a0a0a", color: "#ddd6fe" }}>Closing Quote</option>
                </select>
                <button onClick={async () => {
                  if (item.id) await supabase.from("journey").delete().eq("id", item.id);
                  setJourney(prev => prev.filter((_, idx) => idx !== i));
                }} style={btnDanger}>Delete</button>
              </div>
              <textarea value={item.content} onChange={e => { const j = [...journey]; j[i].content = e.target.value; setJourney(j); }} rows={4}
                style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => setJourney(prev => [...prev, { type: "paragraph", content: "", order_index: prev.length }])} style={btnSecondary}>
              + Add Paragraph
            </button>
            <button onClick={saveJourney} disabled={journeySaving} style={btnPrimary}>
              {journeySaving ? "Saving..." : "Save Journey"}
            </button>
          </div>
        </div>
      )}

      {/* GOALS */}
      {tab === "goals" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {goals.map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", gap: "0.75rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Badge</label>
                  <input type="text" value={item.badge} onChange={e => { const g = [...goals]; g[i].badge = e.target.value; setGoals(g); }} placeholder="e.g. Career Goal" style={inputStyle} />
                </div>
                <button onClick={async () => {
                  if (item.id) await supabase.from("future_goals").delete().eq("id", item.id);
                  setGoals(prev => prev.filter((_, idx) => idx !== i));
                }} style={{ ...btnDanger, alignSelf: "flex-end" }}>Delete</button>
              </div>
              <label style={labelStyle}>Description</label>
              <textarea value={item.description} onChange={e => { const g = [...goals]; g[i].description = e.target.value; setGoals(g); }} rows={3}
                style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => setGoals(prev => [...prev, { badge: "", description: "", order_index: prev.length }])} style={btnSecondary}>
              + Add Goal
            </button>
            <button onClick={saveGoals} disabled={goalsSaving} style={btnPrimary}>
              {goalsSaving ? "Saving..." : "Save Goals"}
            </button>
          </div>
        </div>
      )}

      {/* HOBBIES */}
      {tab === "hobbies" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {hobbies.map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "0.75rem", alignItems: "end", marginBottom: "0.75rem" }}>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input type="text" value={item.title} onChange={e => { const h = [...hobbies]; h[i].title = e.target.value; setHobbies(h); }} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Badge (optional)</label>
                  <input type="text" value={item.badge} onChange={e => { const h = [...hobbies]; h[i].badge = e.target.value; setHobbies(h); }} style={inputStyle} />
                </div>
                <button onClick={async () => {
                  if (item.id) await supabase.from("hobbies").delete().eq("id", item.id);
                  setHobbies(prev => prev.filter((_, idx) => idx !== i));
                }} style={btnDanger}>Delete</button>
              </div>
              <label style={labelStyle}>Description</label>
              <input type="text" value={item.description} onChange={e => { const h = [...hobbies]; h[i].description = e.target.value; setHobbies(h); }} style={inputStyle} />
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => setHobbies(prev => [...prev, { title: "", description: "", badge: "", order_index: prev.length }])} style={btnSecondary}>
              + Add Hobby
            </button>
            <button onClick={saveHobbies} disabled={hobbiesSaving} style={btnPrimary}>
              {hobbiesSaving ? "Saving..." : "Save Hobbies"}
            </button>
          </div>
        </div>
      )}

    </AdminShell>
  );
}