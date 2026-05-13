import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "./supabase";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin");
      } else {
        setChecking(false);
      }
    });
  }, []);

  if (checking) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "sans-serif", color: "#9c7b6e" }}>
        Verifying access...
      </div>
    );
  }

  return <>{children}</>;
}