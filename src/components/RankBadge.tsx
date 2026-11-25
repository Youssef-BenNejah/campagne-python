import { Link } from "react-router-dom";
import { rankForXp } from "../data/topics";

export function RankBadge({ xp }: { xp: number }) {
  const rank = rankForXp(xp);
  return (
    <Link
      to="/grades"
      className="flex items-center gap-2.5 rounded-sm hover:bg-bunker-800"
      title="Voir les grades de la campagne"
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-brass-500 bg-bunker-800 font-display text-sm font-semibold text-brass-300"
      >
        {rank.name.slice(0, 1)}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-sm font-medium tracking-wide text-paper-100">
          {rank.name}
        </span>
        <span className="font-mono text-xs text-olive-400">{xp} XP</span>
      </div>
    </Link>
  );
}
