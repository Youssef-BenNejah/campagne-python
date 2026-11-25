import { rankForXp, ranks } from "../data/topics";

export function RankLadder({ xp }: { xp: number }) {
  const currentRankId = rankForXp(xp).id;

  return (
    <ol className="flex flex-wrap gap-1.5" aria-label="Échelle des grades">
      {ranks.map((rank) => {
        const reached = xp >= rank.minXp;
        const isCurrent = rank.id === currentRankId;
        return (
          <li
            key={rank.id}
            aria-current={isCurrent ? "true" : undefined}
            className={
              "border px-2 py-1 font-mono text-[11px] " +
              (isCurrent
                ? "border-brass-400 bg-brass-500/20 text-brass-300"
                : reached
                  ? "border-brass-600 text-brass-500"
                  : "border-olive-600 text-olive-500")
            }
          >
            {rank.name}
          </li>
        );
      })}
    </ol>
  );
}
