import { nextRank, rankForXp } from "../data/topics";

export function XPBar({ xp }: { xp: number }) {
  const rank = rankForXp(xp);
  const upcoming = nextRank(xp);
  const span = upcoming ? upcoming.minXp - rank.minXp : 1;
  const progress = upcoming ? Math.min(1, (xp - rank.minXp) / span) : 1;

  return (
    <div className="w-full max-w-xs">
      <div
        role="progressbar"
        aria-valuenow={xp}
        aria-valuemin={rank.minXp}
        aria-valuemax={upcoming?.minXp ?? xp}
        aria-label={upcoming ? `Progression vers ${upcoming.name}` : "Grade maximal atteint"}
        className="h-2 w-full overflow-hidden rounded-full bg-bunker-800"
      >
        <div
          className="h-full rounded-full bg-brass-500 transition-[width] duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="mt-1 font-mono text-[11px] text-olive-400">
        {upcoming ? `${upcoming.minXp - xp} XP avant ${upcoming.name}` : "Grade maximal"}
      </p>
    </div>
  );
}
