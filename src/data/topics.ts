export type Difficulty = 1 | 2 | 3;

export interface Topic {
  id: string;
  /** Matches a file in base_connaissance/, for traceability back to source material and the course page. */
  source: string;
  name: string;
  summary: string;
}

/** Sectors on the campaign map. One per topic file in base_connaissance/. */
export const topics: Topic[] = [
  {
    id: "tri",
    source: "01_tri.md",
    name: "Tri",
    summary: "Tri à bulle, tri par sélection, tri de tableaux parallèles.",
  },
  {
    id: "recherche",
    source: "02_recherche.md",
    name: "Recherche",
    summary: "Recherche séquentielle et recherche dichotomique.",
  },
  {
    id: "calcul-arithmetique",
    source: "03_calcul_arithmetique.md",
    name: "Calcul arithmétique",
    summary: "PGCD, PPCM, nombres premiers, factorielle.",
  },
  {
    id: "enregistrements",
    source: "04_enregistrements.md",
    name: "Enregistrements",
    summary: "Types enregistrement, vecteurs d'enregistrements.",
  },
  {
    id: "analyse-modulaire",
    source: "05_analyse_modulaire.md",
    name: "Analyse modulaire",
    summary: "Décomposition en modules, diviseurs, permutations.",
  },
  {
    id: "optimisation",
    source: "06_optimisation.md",
    name: "Optimisation",
    summary: "Max/min par balayage, surfaces et volumes optimaux.",
  },
  {
    id: "approximation",
    source: "07_approximation.md",
    name: "Approximation",
    summary: "Approximations de π, e, φ, √N.",
  },
  {
    id: "tableaux-2d",
    source: "09_tableaux_2d.md",
    name: "Tableaux 2D",
    summary: "Matrices : parcours, diagonales, Pascal, palindromes.",
  },
  {
    id: "proprietes-numeriques",
    source: "10_corrections_proprietes_numeriques.md",
    name: "Propriétés numériques",
    summary: "Nombres parfaits, oblongs, porte-bonheur, k-pp.",
  },
  {
    id: "enregistrements-serie",
    source: "11_enregistrements_serie.md",
    name: "Enregistrements — série",
    summary: "ELEVE, JOUEUR, CLIENT, ADHERENT.",
  },
];

export interface Rank {
  id: string;
  name: string;
  minXp: number;
  tagline: string;
}

/** The campaign ladder: rank unlocks at cumulative XP thresholds. */
export const ranks: Rank[] = [
  {
    id: "recrue",
    name: "Recrue",
    minXp: 0,
    tagline: "Tu viens de rejoindre la campagne. Chaque ligne de code est un premier pas.",
  },
  {
    id: "soldat",
    name: "Soldat",
    minXp: 200,
    tagline: "Les bases sont acquises. Direction les premiers avant-postes sérieux.",
  },
  {
    id: "caporal",
    name: "Caporal",
    minXp: 500,
    tagline: "Tu enchaînes les victoires sans trop d'hésitation.",
  },
  {
    id: "sergent",
    name: "Sergent",
    minXp: 900,
    tagline: "Les boucles et les tableaux n'ont plus de secret pour toi.",
  },
  {
    id: "lieutenant",
    name: "Lieutenant",
    minXp: 1400,
    tagline: "Tu es prêt à affronter des problèmes qui combinent plusieurs notions.",
  },
  {
    id: "capitaine",
    name: "Capitaine",
    minXp: 2000,
    tagline: "Un vétéran des fronts. Peu de pièges t'arrêtent encore.",
  },
  {
    id: "commandant",
    name: "Commandant",
    minXp: 2700,
    tagline: "Tu diriges la stratégie : plus grand-chose ne te résiste.",
  },
  {
    id: "colonel",
    name: "Colonel",
    minXp: 3500,
    tagline: "Le sommet de la campagne. Tu maîtrises l'algorithmique du programme.",
  },
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
