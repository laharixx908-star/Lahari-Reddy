import { useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fdf8f6", padding: "1rem" }}>
      <div style={{ background: "#fff", border: "0.5px solid #e8ddd9", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "400px", boxShadow: "0 4px 24px rgba(92,48,34,0.08)" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.8rem", color: "#3a1f14", marginBottom: "0.25rem" }}>Admin</h1>
        <p style={{ color: "#9c7b6e", fontSize: "0.85rem", marginBottom: "2rem" }}>Sign in to manage your portfolio</p>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9c7b6e", marginBottom: "0.4rem" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: "100%", padding: "0.65rem 0.875rem", border: "0.5px solid #e8ddd9", borderRadius: "8px", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }} />
          </div>
          {error && <p style={{ color: "#c0392b", fontSize: "0.85rem", margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ background: "#5c3022", color: "#fdf8f6", border: "none", borderRadius: "8px", padding: "0.75rem", fontSize: "0.9rem", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "0.5rem" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
