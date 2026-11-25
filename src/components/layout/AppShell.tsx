import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../lib/useAuth";
import { useProgress } from "../../lib/useProgress";
import { RankBadge } from "../RankBadge";
import { XPBar } from "../XPBar";

export function AppShell({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const { xp } = useProgress();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-brass-500 focus:px-3 focus:py-2 focus:text-bunker-950"
      >
        Aller au contenu principal
      </a>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-olive-600 bg-bunker-900 px-5 py-3">
        <Link to="/" className="font-display text-lg font-semibold tracking-wide text-paper-100">
          Campagne Python
        </Link>
        {session ? (
          <div className="flex items-center gap-5">
            <Link to="/journal" className="font-mono text-xs text-olive-400 hover:text-paper-200">
              journal
            </Link>
            <Link to="/mentor" className="font-mono text-xs text-olive-400 hover:text-paper-200">
              mentor
            </Link>
            <XPBar xp={xp} />
            <RankBadge xp={xp} />
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="font-mono text-xs text-olive-400 underline-offset-2 hover:text-paper-200 hover:underline"
            >
              se déconnecter
            </button>
          </div>
        ) : (
          <Link to="/connexion" className="font-mono text-xs text-brass-400 hover:text-brass-300">
            se connecter
          </Link>
        )}
      </header>
      <main id="main" className="flex-1 bg-bunker-950">
        {children}
      </main>
    </div>
  );
}
