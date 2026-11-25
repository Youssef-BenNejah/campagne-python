import { Link } from "react-router-dom";
import { RankLadder } from "../components/RankLadder";
import { SectorCard } from "../components/SectorCard";
import { getExercisesForTopic } from "../data/exercises";
import { topics } from "../data/topics";
import { isWarUnlocked, wars } from "../data/wars";
import { pickDailyMission } from "../lib/dailyMission";
import { useProgress } from "../lib/useProgress";

export function CampaignMap() {
  const { clearedByTopic, statsByTopic, xp, loading } = useProgress();
  const dailyMission = loading ? null : pickDailyMission(clearedByTopic, statsByTopic);
  const weakTopic = findWeakestTopic(statsByTopic);

  return (
    <div className="bg-contour px-5 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-2xl font-semibold text-paper-100">Carte de campagne</h1>
        <p className="mt-1 max-w-prose text-sm text-olive-400">
          Chaque secteur regroupe les avant-postes d'un chapitre. Dégage les avant-postes pour
          sécuriser un secteur, puis débloque les fronts qui combinent plusieurs secteurs.
        </p>

        {!loading && (
          <div className="mt-4">
            <RankLadder xp={xp} />
          </div>
        )}

        {loading ? (
          <p role="status" aria-busy="true" className="mt-6 font-mono text-sm text-olive-400">
            Chargement de la progression…
          </p>
        ) : (
          <>
            {dailyMission && (
              <Link
                to={`/secteur/${dailyMission.topicId}/${dailyMission.exercise.id}`}
                className="mt-6 flex items-center justify-between gap-3 border border-brass-500 bg-brass-500/10 px-4 py-3 transition-colors hover:bg-brass-500/20"
              >
                <div>
                  <p className="font-mono text-[11px] text-brass-400">Mission du jour</p>
                  <p className="font-display text-base text-paper-100">
                    {dailyMission.exercise.title}
                  </p>
                </div>
                <span className="font-mono text-xs text-brass-400">y aller →</span>
              </Link>
            )}

            {weakTopic && (
              <p className="mt-3 font-mono text-xs text-olive-400">
                Secteur à retravailler :{" "}
                <Link
                  to={`/secteur/${weakTopic}`}
                  className="text-signal-danger-strong hover:underline"
                >
                  {topics.find((t) => t.id === weakTopic)?.name}
                </Link>
              </p>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic) => (
                <SectorCard
                  key={topic.id}
                  topic={topic}
                  cleared={clearedByTopic[topic.id] ?? 0}
                  total={getExercisesForTopic(topic.id).length}
                />
              ))}
            </div>

            <h2 className="mt-10 font-display text-xl font-semibold text-paper-100">Fronts</h2>
            <p className="mt-1 max-w-prose text-sm text-olive-400">
              Chaque front combine plusieurs secteurs. Sécurise-les tous pour le débloquer.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {wars.map((war) => {
                const unlocked = isWarUnlocked(war, clearedByTopic);
                return (
                  <li key={war.id}>
                    {unlocked ? (
                      <Link
                        to={`/guerre/${war.id}`}
                        className="block border border-brass-600 bg-bunker-900 p-4 transition-colors hover:border-brass-400"
                      >
                        <p className="font-mono text-[11px] text-brass-400">débloqué</p>
                        <h3 className="mt-1 font-display text-lg font-medium text-paper-100">
                          {war.title}
                        </h3>
                      </Link>
                    ) : (
                      <div className="border border-olive-700 bg-bunker-900/60 p-4 opacity-60">
                        <p className="font-mono text-[11px] text-olive-500">
                          verrouillé — sécurise{" "}
                          {war.requiredTopicIds
                            .map((id) => topics.find((t) => t.id === id)?.name)
                            .join(" et ")}
                        </p>
                        <h3 className="mt-1 font-display text-lg font-medium text-paper-300">
                          {war.title}
                        </h3>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function findWeakestTopic(
  statsByTopic: Record<string, { attempts: number; passes: number }>,
): string | null {
  let weakest: string | null = null;
  let weakestAccuracy = Infinity;
  for (const [topicId, stats] of Object.entries(statsByTopic)) {
    if (stats.attempts < 2) continue;
    const accuracy = stats.passes / stats.attempts;
    if (accuracy < 1 && accuracy < weakestAccuracy) {
      weakestAccuracy = accuracy;
      weakest = topicId;
    }
  }
  return weakest;
}
