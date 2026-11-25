import { rankForXp, ranks } from "../data/topics";
import { rankImages } from "../data/rankImages";
import { useProgress } from "../lib/useProgress";

export function Grades() {
  const { xp, loading } = useProgress();
  const currentRankId = loading ? null : rankForXp(xp).id;

  return (
    <div className="bg-contour px-5 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-2xl font-semibold text-paper-100">
          Les grades de la campagne
        </h1>
        <p className="mt-1 max-w-prose text-sm text-olive-400">
          De recrue à colonel : huit échelons, chacun débloqué à un palier d'XP cumulé.
        </p>

        <div className="mt-6 space-y-4">
          {ranks.map((rank, index) => {
            const reached = !loading && xp >= rank.minXp;
            const isCurrent = rank.id === currentRankId;
            const upcoming = ranks[index + 1] ?? null;
            const xpSpan = upcoming ? upcoming.minXp - rank.minXp : null;
            const progressInRank =
              isCurrent && xpSpan ? Math.min(1, (xp - rank.minXp) / xpSpan) : reached ? 1 : 0;

            return (
              <section
                key={rank.id}
                aria-current={isCurrent ? "true" : undefined}
                className={
                  "flex flex-col overflow-hidden border md:flex-row " +
                  (isCurrent
                    ? "border-brass-400 bg-brass-500/10"
                    : reached
                      ? "border-brass-600 bg-bunker-900"
                      : "border-olive-700 bg-bunker-900/60")
                }
              >
                <div className="flex flex-1 flex-col justify-center gap-2 px-5 py-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] text-olive-400">
                      Grade {index + 1}/{ranks.length}
                    </span>
                    {isCurrent && (
                      <span className="border border-brass-400 px-1.5 py-0.5 font-mono text-[10px] text-brass-300">
                        grade actuel
                      </span>
                    )}
                    {!reached && (
                      <span className="font-mono text-[10px] text-olive-500">verrouillé</span>
                    )}
                  </div>
                  <h2
                    className={
                      "font-display text-2xl font-semibold " +
                      (reached ? "text-paper-100" : "text-paper-300")
                    }
                  >
                    {rank.name}
                  </h2>
                  <p className="max-w-prose text-sm text-paper-300">{rank.tagline}</p>
                  <p className="font-mono text-xs text-olive-400">
                    {rank.minXp === 0 ? "Dès le départ" : `${rank.minXp} XP cumulés requis`}
                  </p>

                  {isCurrent && xpSpan && (
                    <div className="mt-2 max-w-xs">
                      <div className="h-1.5 w-full overflow-hidden bg-bunker-800">
                        <div
                          className="h-full bg-brass-500"
                          style={{ width: `${progressInRank * 100}%` }}
                        />
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-olive-400">
                        {Math.max(0, upcoming!.minXp - xp)} XP avant {upcoming!.name}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 items-end justify-center bg-bunker-950 px-4 md:w-56">
                  <img
                    src={rankImages[rank.id]}
                    alt={`Illustration du grade ${rank.name}`}
                    className={
                      "max-h-64 w-auto object-contain md:max-h-72 " +
                      (reached ? "" : "opacity-40 grayscale")
                    }
                    loading="lazy"
                    width={448}
                    height={640}
                  />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
