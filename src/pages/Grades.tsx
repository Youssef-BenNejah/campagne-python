import { getExercisesForTopic } from "../data/exercises";
import { rankImages } from "../data/rankImages";
import { rankForXp, ranks, topics } from "../data/topics";
import { useProgress } from "../lib/useProgress";

export function Grades() {
  const { xp, clearedByTopic, statsByTopic, loading } = useProgress();

  if (loading) {
    return (
      <p role="status" aria-busy="true" className="px-5 py-16 text-center font-mono text-sm text-olive-400">
        Chargement du profil…
      </p>
    );
  }

  const rank = rankForXp(xp);
  const rankIndex = ranks.findIndex((r) => r.id === rank.id);
  const upcoming = ranks[rankIndex + 1] ?? null;
  const xpSpan = upcoming ? upcoming.minXp - rank.minXp : null;
  const progressInRank = xpSpan ? Math.min(1, (xp - rank.minXp) / xpSpan) : 1;

  const totalExercises = topics.reduce((sum, t) => sum + getExercisesForTopic(t.id).length, 0);
  const totalCleared = Object.values(clearedByTopic).reduce((sum, n) => sum + n, 0);
  const totals = Object.values(statsByTopic).reduce(
    (acc, s) => ({ attempts: acc.attempts + s.attempts, passes: acc.passes + s.passes }),
    { attempts: 0, passes: 0 },
  );
  const accuracy = totals.attempts > 0 ? Math.round((totals.passes / totals.attempts) * 100) : null;

  return (
    <div className="bg-contour px-5 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-2xl font-semibold text-paper-100">Ton profil</h1>
        <p className="mt-1 max-w-prose text-sm text-olive-400">
          Grade {rankIndex + 1}/{ranks.length} dans la campagne.
        </p>

        <section className="mt-6 flex flex-col overflow-hidden border border-brass-400 bg-brass-500/10 md:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-2 px-5 py-5">
            <span className="w-fit border border-brass-400 px-1.5 py-0.5 font-mono text-[10px] text-brass-300">
              grade actuel
            </span>
            <h2 className="font-display text-3xl font-semibold text-paper-100">{rank.name}</h2>
            <p className="max-w-prose text-sm text-paper-300">{rank.tagline}</p>

            <div className="mt-2 max-w-xs">
              <div className="h-1.5 w-full overflow-hidden bg-bunker-800">
                <div
                  className="h-full bg-brass-500"
                  style={{ width: `${progressInRank * 100}%` }}
                />
              </div>
              <p className="mt-1 font-mono text-[11px] text-olive-400">
                {upcoming
                  ? `${Math.max(0, upcoming.minXp - xp)} XP avant ${upcoming.name}`
                  : "Grade maximal atteint"}
              </p>
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-3">
              <div>
                <dt className="font-mono text-[10px] text-olive-400">XP total</dt>
                <dd className="font-display text-lg text-paper-100">{xp}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] text-olive-400">Avant-postes</dt>
                <dd className="font-display text-lg text-paper-100">
                  {totalCleared}/{totalExercises}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] text-olive-400">Précision</dt>
                <dd className="font-display text-lg text-paper-100">
                  {accuracy === null ? "—" : `${accuracy}%`}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex shrink-0 items-end justify-center bg-bunker-950 px-4 md:w-64">
            <img
              src={rankImages[rank.id]}
              alt={`Illustration du grade ${rank.name}`}
              className="max-h-80 w-auto object-contain md:max-h-96"
              width={448}
              height={640}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
