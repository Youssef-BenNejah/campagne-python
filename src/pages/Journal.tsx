import { topics } from "../data/topics";
import { useProgress } from "../lib/useProgress";

function topicLabel(topicId: string): string {
  if (topicId === "guerre") return "Front";
  return topics.find((t) => t.id === topicId)?.name ?? topicId;
}

export function Journal() {
  const { history, loading } = useProgress();

  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <h1 className="font-display text-2xl font-semibold text-paper-100">Journal de campagne</h1>
      <p className="mt-1 text-sm text-olive-400">
        L'historique de toutes les missions tentées, de la plus récente à la plus ancienne.
      </p>

      {loading ? (
        <p role="status" aria-busy="true" className="mt-6 font-mono text-sm text-olive-400">
          Chargement…
        </p>
      ) : history.length === 0 ? (
        <p className="mt-6 text-sm text-paper-300">
          Aucune mission tentée pour l'instant. Rends-toi sur la carte de campagne pour commencer.
        </p>
      ) : (
        <ul className="mt-6 space-y-1.5">
          {history.map((row) => (
            <li
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-2 border border-olive-600 bg-bunker-900 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <span
                  className={
                    "font-mono text-xs " +
                    (row.passed ? "text-signal-success-strong" : "text-signal-danger-strong")
                  }
                >
                  {row.passed ? "✓" : "✗"}
                </span>
                <span className="font-mono text-[11px] text-olive-400">
                  {topicLabel(row.topic_id)}
                </span>
                <span className="text-sm text-paper-200">{row.exercise_id}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-olive-400">
                <span>
                  {row.passed_count}/{row.total_count} tests
                </span>
                {row.passed && <span className="text-brass-400">+{row.xp_awarded} XP</span>}
                <time dateTime={row.created_at}>
                  {new Date(row.created_at).toLocaleDateString("fr-TN", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
