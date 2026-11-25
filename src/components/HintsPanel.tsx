import { useState } from "react";
import type { Exercise } from "../data/exercises";
import { hasLoopOrComprehension } from "../lib/structureCheck";

type Level = "closed" | "nudge" | "solution";

/**
 * Two tiers on purpose, not three: a free structural/constraints nudge
 * (computed from the exercise + a static check of the student's own code),
 * then the full reference solution. A fabricated "pseudo-code" middle tier
 * would need hand-written content for all 30 exercises for little real
 * teaching value over the nudge + the diff already shown above.
 */
export function HintsPanel({ exercise, code }: { exercise: Exercise; code: string }) {
  const [level, setLevel] = useState<Level>("closed");
  const [nudgeLines, setNudgeLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function revealNudge() {
    setLoading(true);
    const lines: string[] = [];
    if (exercise.expectsLoop !== false) {
      const hasLoop = await hasLoopOrComprehension(code);
      if (!hasLoop) {
        lines.push(
          "Ton code ne contient ni boucle (for/while) ni liste en compréhension — " +
            "cet exercice s'y prête naturellement, regarde si tu n'en as pas besoin.",
        );
      }
    }
    lines.push(`Relis bien les contraintes : ${exercise.constraints.join(" · ")}`);
    setNudgeLines(lines);
    setLevel("nudge");
    setLoading(false);
  }

  return (
    <div className="border border-olive-600 bg-bunker-900">
      <div className="flex flex-wrap items-center gap-2 border-b border-olive-600 px-4 py-2">
        <span className="font-mono text-[11px] text-olive-400">Besoin d'aide ?</span>
        {level === "closed" && (
          <button
            type="button"
            onClick={revealNudge}
            disabled={loading}
            className="ml-auto border border-brass-500 px-3 py-1 font-mono text-xs text-brass-400 hover:bg-brass-500 hover:text-bunker-950 disabled:opacity-50"
          >
            {loading ? "Analyse…" : "Indice"}
          </button>
        )}
        {level === "nudge" && (
          <button
            type="button"
            onClick={() => setLevel("solution")}
            className="ml-auto border border-signal-danger-strong px-3 py-1 font-mono text-xs text-signal-danger-strong hover:bg-signal-danger-strong hover:text-bunker-950"
          >
            Voir la solution
          </button>
        )}
      </div>

      {level !== "closed" && (
        <div className="px-4 py-3">
          <ul className="list-inside list-disc space-y-1 text-sm text-paper-300">
            {nudgeLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {level === "solution" && (
        <div className="border-t border-olive-600 px-4 py-3">
          <p className="font-mono text-[11px] text-signal-danger-strong">
            Solution de référence — ne la recopie pas sans comprendre, sinon tu n'auras rien appris.
          </p>
          <pre className="mt-2 overflow-x-auto bg-bunker-950 p-3 font-mono text-xs text-paper-200">
            {exercise.referenceSolution}
          </pre>
        </div>
      )}
    </div>
  );
}
