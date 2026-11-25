import { SectorCard } from "../components/SectorCard";
import { topics } from "../data/topics";
import { useProgress } from "../lib/useProgress";

export function CampaignMap() {
  const { clearedByTopic, loading } = useProgress();

  return (
    <div className="bg-contour px-5 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-2xl font-semibold text-paper-100">Carte de campagne</h1>
        <p className="mt-1 max-w-prose text-sm text-olive-400">
          Chaque secteur regroupe les avant-postes d'un chapitre. Dégage les avant-postes pour
          sécuriser un secteur, puis débloque les fronts qui combinent plusieurs secteurs.
        </p>
        {loading ? (
          <p role="status" aria-busy="true" className="mt-6 font-mono text-sm text-olive-400">
            Chargement de la progression…
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <SectorCard key={topic.id} topic={topic} cleared={clearedByTopic[topic.id] ?? 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
