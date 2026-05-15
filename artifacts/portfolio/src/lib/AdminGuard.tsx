import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "./supabase";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin");
      else setChecking(false);
    });
  }, []);

  if (checking) return (
    <div style={{ minHeight: "100vh", background: "#000000" }} />
  );

  return <>{children}</>;
}