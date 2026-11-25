import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { RankBadge } from "../RankBadge";
import { XPBar } from "../XPBar";

/** Placeholder until Phase 1 wires real auth + persisted progress from Supabase. */
const DEMO_XP = 640;

export function AppShell({ children }: { children: ReactNode }) {
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
        <div className="flex items-center gap-5">
          <XPBar xp={DEMO_XP} />
          <RankBadge xp={DEMO_XP} />
        </div>
      </header>
      <main id="main" className="flex-1 bg-bunker-950">
        {children}
      </main>
    </div>
  );
}
