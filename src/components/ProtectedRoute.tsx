import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <p role="status" aria-busy="true" className="px-5 py-16 text-center font-mono text-sm text-olive-400">
        Vérification de la session…
      </p>
    );
  }

  if (!session) {
    return <Navigate to="/connexion" replace />;
  }

  return <>{children}</>;
}
