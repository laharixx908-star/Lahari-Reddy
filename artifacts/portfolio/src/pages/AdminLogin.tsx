import { useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { T } from "@/lib/adminTheme";

export default function AdminLogin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [, navigate]            = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError("Invalid email or password."); setLoading(false); }
    else navigate("/admin/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "380px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontFamily: T.serif, fontSize: "1.5rem", color: T.textPrimary, letterSpacing: "0.1em", marginBottom: "0.375rem" }}>
            LAHARI CMS
          </div>
          <div style={{ width: "40px", height: "1px", background: T.purple, margin: "0 auto" }} />
        </div>

        {/* Card */}
        <div style={{ background: T.bgSurface, border: `0.5px solid ${T.borderMid}`, borderRadius: "16px", padding: "2rem" }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: T.textMuted, marginBottom: "1.5rem" }}>
            Admin Sign In
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginBottom: "0.4rem" }}>Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ width: "100%", padding: "0.7rem 0.875rem", background: T.bgInput, border: `0.5px solid ${T.purpleBorder}`, borderRadius: "8px", fontSize: "0.875rem", color: T.textPrimary, outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.textMuted, marginBottom: "0.4rem" }}>Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                style={{ width: "100%", padding: "0.7rem 0.875rem", background: T.bgInput, border: `0.5px solid ${T.purpleBorder}`, borderRadius: "8px", fontSize: "0.875rem", color: T.textPrimary, outline: "none", boxSizing: "border-box" }}
              />
            </div>
            {error && <p style={{ color: T.danger, fontSize: "0.82rem", margin: 0 }}>{error}</p>}
            <button
              type="submit" disabled={loading}
              style={{ background: T.purple, color: "#fff", border: "none", borderRadius: "8px", padding: "0.75rem", fontSize: "0.875rem", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "0.5rem", fontWeight: 500 }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}