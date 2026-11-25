import { Link, Navigate, useParams } from "react-router-dom";
import { getExercisesForTopic } from "../data/exercises";
import { topics } from "../data/topics";
import { useProgress } from "../lib/useProgress";

export function TopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topics.find((t) => t.id === topicId);
  const { bestByExercise, loading } = useProgress();

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  const exercises = getExercisesForTopic(topic.id);

  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <Link to="/" className="font-mono text-xs text-olive-400 hover:text-paper-200">
        ← carte de campagne
      </Link>
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-paper-100">{topic.name}</h1>
        <Link
          to={`/secteur/${topic.id}/cours`}
          className="shrink-0 border border-brass-500 px-3 py-1.5 font-mono text-xs text-brass-400 hover:bg-brass-500 hover:text-bunker-950"
        >
          lire le cours
        </Link>
      </div>
      <p className="mt-1 text-sm text-olive-400">{topic.summary}</p>

      {loading ? (
        <p role="status" aria-busy="true" className="mt-6 font-mono text-sm text-olive-400">
          Chargement…
        </p>
      ) : exercises.length === 0 ? (
        <p className="mt-6 text-sm text-paper-300">
          Aucun avant-poste n'est encore déployé dans ce secteur.
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {exercises.map((exercise) => {
            const cleared = exercise.id in bestByExercise;
            return (
              <li key={exercise.id}>
                <Link
                  to={`/secteur/${topic.id}/${exercise.id}`}
                  className="flex items-center justify-between gap-3 border border-olive-600 bg-bunker-900 px-4 py-3 transition-colors hover:border-brass-500"
                >
                  <div>
                    <p className="font-mono text-[11px] text-olive-400">
                      Difficulté {exercise.difficulty}/3
                    </p>
                    <p className="font-display text-base text-paper-100">{exercise.title}</p>
                  </div>
                  {cleared && (
                    <span className="shrink-0 font-mono text-xs text-signal-success-strong">
                      ✓ dégagé
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
