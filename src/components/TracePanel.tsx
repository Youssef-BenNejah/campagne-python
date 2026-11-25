import { useState } from "react";
import { traceFunction, type TraceResult } from "../lib/trace";

/** Step-by-step execution view — the in-browser version of the "traçage pas
 * à pas" the course material already teaches by hand for loops. */
export function TracePanel({
  code,
  functionName,
  args,
  caseLabel,
}: {
  code: string;
  functionName: string;
  args: unknown[];
  caseLabel: string;
}) {
  const [trace, setTrace] = useState<TraceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  async function runTrace() {
    setLoading(true);
    setLoadError(null);
    try {
      const result = await traceFunction(code, functionName, args);
      setTrace(result);
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Impossible de lancer l'interpréteur Python.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-olive-600 bg-bunker-900 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] text-olive-400">
          Déroulé pas à pas — « {caseLabel} »
        </span>
        <button
          type="button"
          onClick={runTrace}
          disabled={loading}
          className="ml-auto border border-olive-400 px-3 py-1 font-mono text-xs text-olive-400 hover:bg-olive-500 hover:text-bunker-950 disabled:opacity-50"
        >
          {loading ? "Exécution…" : trace ? "Relancer" : "Voir le déroulé"}
        </button>
      </div>

      {loadError && (
        <p role="alert" className="mt-3 font-mono text-xs text-signal-danger-strong">
          {loadError}
        </p>
      )}

      {trace && (
        <div className="mt-3">
          {trace.error && !trace.steps.length && (
            <p role="alert" className="font-mono text-xs text-signal-danger-strong">
              {trace.error}
            </p>
          )}
          {trace.steps.length === 0 && !trace.error && (
            <p className="font-mono text-xs text-olive-400">
              Ta fonction n'exécute aucune ligne observable (retour immédiat ?).
            </p>
          )}
          {trace.steps.length > 0 && (
            <div className="max-h-72 overflow-y-auto">
              <table className="w-full border-collapse font-mono text-xs">
                <thead>
                  <tr className="text-left text-olive-400">
                    <th className="border-b border-olive-600 py-1 pr-3">#</th>
                    <th className="border-b border-olive-600 py-1 pr-3">ligne</th>
                    <th className="border-b border-olive-600 py-1">variables</th>
                  </tr>
                </thead>
                <tbody>
                  {trace.steps.map((step, i) => (
                    <tr key={i} className="align-top">
                      <td className="border-b border-bunker-800 py-1 pr-3 text-olive-400">
                        {i + 1}
                      </td>
                      <td className="border-b border-bunker-800 py-1 pr-3 text-paper-200">
                        {step.source || `ligne ${step.line}`}
                      </td>
                      <td className="border-b border-bunker-800 py-1 text-brass-400">
                        {Object.entries(step.locals)
                          .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
                          .join("  ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {trace.truncated && (
                <p className="mt-1 font-mono text-[11px] text-olive-400">
                  Déroulé tronqué (plus de 200 étapes) — ta boucle tourne peut-être trop longtemps.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
