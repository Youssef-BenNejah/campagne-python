import { SectorCard } from "../components/SectorCard";
import { topics } from "../data/topics";

/** Placeholder progress until Phase 2 wires real submission history. */
const DEMO_PROGRESS: Record<string, number> = {
  tri: 3,
  recherche: 1,
  "calcul-arithmetique": 0,
  enregistrements: 0,
  "analyse-modulaire": 0,
  optimisation: 0,
  approximation: 0,
  "tableaux-2d": 0,
  "proprietes-numeriques": 0,
  "enregistrements-serie": 0,
};

export function CampaignMap() {
  return (
    <div className="bg-contour px-5 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-2xl font-semibold text-paper-100">Carte de campagne</h1>
        <p className="mt-1 max-w-prose text-sm text-olive-400">
          Chaque secteur regroupe les avant-postes d'un chapitre. Dégage les avant-postes pour
          sécuriser un secteur, puis débloque les fronts qui combinent plusieurs secteurs.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <SectorCard key={topic.id} topic={topic} cleared={DEMO_PROGRESS[topic.id] ?? 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
