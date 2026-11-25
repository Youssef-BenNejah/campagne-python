import { Link } from "react-router-dom";
import type { Topic } from "../data/topics";

export function SectorCard({ topic, cleared }: { topic: Topic; cleared: number }) {
  const complete = cleared >= topic.totalOutposts;

  return (
    <Link
      to={`/secteur/${topic.id}`}
      className="group relative block border border-olive-600 bg-bunker-900 p-4 transition-colors hover:border-brass-500 focus-visible:border-brass-500"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] text-olive-400">
            {cleared}/{topic.totalOutposts} avant-postes
          </p>
          <h3 className="mt-1 font-display text-lg font-medium text-paper-100">
            {topic.name}
          </h3>
        </div>
        {complete && (
          <span className="shrink-0 rounded-sm border border-signal-success-strong px-1.5 py-0.5 font-mono text-[10px] text-signal-success-strong">
            sécurisé
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-paper-300">{topic.summary}</p>
      <div className="mt-3 h-1 w-full bg-bunker-800">
        <div
          className="h-full bg-olive-400 group-hover:bg-brass-500"
          style={{ width: `${Math.min(100, (cleared / topic.totalOutposts) * 100)}%` }}
        />
      </div>
    </Link>
  );
}
