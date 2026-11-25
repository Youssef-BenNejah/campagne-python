import type { ReactNode } from "react";

/**
 * A "mission orders" sheet: paper surface, torn/cut top edge via clip-path,
 * used for exercise statements and course material — never for the code
 * editor itself.
 */
export function DossierPanel({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 bg-paper-200 text-paper-ink">
      <header className="flex items-baseline justify-between border-b border-paper-300 px-5 py-3">
        <span className="font-mono text-[11px] text-paper-ink/60">{label}</span>
      </header>
      <div className="px-5 py-4">
        <h2 className="font-display text-xl font-medium">{title}</h2>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed">{children}</div>
      </div>
    </section>
  );
}
