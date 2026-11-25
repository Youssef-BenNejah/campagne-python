export type Difficulty = 1 | 2 | 3;

export interface Topic {
  id: string;
  /** Matches a file in base_connaissance/, for traceability back to source material. */
  source: string;
  name: string;
  summary: string;
  totalOutposts: number;
}

/**
 * Sectors on the campaign map. One per topic file in base_connaissance/.
 * totalOutposts is a placeholder count until the real exercise bank (Phase 2) lands.
 */
export const topics: Topic[] = [
  {
    id: "tri",
    source: "01_tri.md",
    name: "Tri",
    summary: "Tri à bulle, tri par sélection, tri de tableaux parallèles.",
    totalOutposts: 7,
  },
  {
    id: "recherche",
    source: "02_recherche.md",
    name: "Recherche",
    summary: "Recherche séquentielle et recherche dichotomique.",
    totalOutposts: 4,
  },
  {
    id: "calcul-arithmetique",
    source: "03_calcul_arithmetique.md",
    name: "Calcul arithmétique",
    summary: "PGCD, PPCM, nombres premiers, factorielle.",
    totalOutposts: 5,
  },
  {
    id: "enregistrements",
    source: "04_enregistrements.md",
    name: "Enregistrements",
    summary: "Types enregistrement, vecteurs d'enregistrements.",
    totalOutposts: 6,
  },
  {
    id: "analyse-modulaire",
    source: "05_analyse_modulaire.md",
    name: "Analyse modulaire",
    summary: "Décomposition en modules, diviseurs, permutations.",
    totalOutposts: 6,
  },
  {
    id: "optimisation",
    source: "06_optimisation.md",
    name: "Optimisation",
    summary: "Max/min par balayage, surfaces et volumes optimaux.",
    totalOutposts: 6,
  },
  {
    id: "approximation",
    source: "07_approximation.md",
    name: "Approximation",
    summary: "Approximations de π, e, φ, √N.",
    totalOutposts: 4,
  },
  {
    id: "tableaux-2d",
    source: "09_tableaux_2d.md",
    name: "Tableaux 2D",
    summary: "Matrices : parcours, diagonales, Pascal, palindromes.",
    totalOutposts: 14,
  },
  {
    id: "proprietes-numeriques",
    source: "10_corrections_proprietes_numeriques.md",
    name: "Propriétés numériques",
    summary: "Nombres parfaits, oblongs, porte-bonheur, k-pp.",
    totalOutposts: 8,
  },
  {
    id: "enregistrements-serie",
    source: "11_enregistrements_serie.md",
    name: "Enregistrements — série",
    summary: "ELEVE, JOUEUR, CLIENT, ADHERENT.",
    totalOutposts: 5,
  },
];

export interface Rank {
  id: string;
  name: string;
  minXp: number;
}

/** The campaign ladder: rank unlocks at cumulative XP thresholds. */
export const ranks: Rank[] = [
  { id: "recrue", name: "Recrue", minXp: 0 },
  { id: "soldat", name: "Soldat", minXp: 200 },
  { id: "caporal", name: "Caporal", minXp: 500 },
  { id: "sergent", name: "Sergent", minXp: 900 },
  { id: "lieutenant", name: "Lieutenant", minXp: 1400 },
  { id: "capitaine", name: "Capitaine", minXp: 2000 },
  { id: "commandant", name: "Commandant", minXp: 2700 },
  { id: "colonel", name: "Colonel", minXp: 3500 },
];

export function rankForXp(xp: number): Rank {
  let current = ranks[0];
  for (const rank of ranks) {
    if (xp >= rank.minXp) current = rank;
  }
  return current;
}

export function nextRank(xp: number): Rank | null {
  return ranks.find((rank) => rank.minXp > xp) ?? null;
}
