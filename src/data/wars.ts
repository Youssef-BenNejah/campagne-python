import { getExercisesForTopic } from "./exercises";
import type { Exercise } from "./exercises/types";

export interface War extends Exercise {
  /** Sectors that must be fully cleared before this front unlocks. */
  requiredTopicIds: string[];
}

export const wars: War[] = [
  {
    id: "front-tri-recherche",
    topicId: "guerre",
    requiredTopicIds: ["tri", "recherche"],
    title: "Front Tri & Recherche",
    difficulty: 3,
    sourceNote: "Combine 01_tri.md (tri par sélection) et 02_recherche.md (dichotomie)",
    briefing:
      "Écris la fonction trouver_position(t, x) qui trie d'abord t par ordre " +
      "croissant, puis retrouve l'indice de x dans le tableau trié par " +
      "recherche dichotomique (-1 si absent).",
    constraints: ["2 ≤ len(t) ≤ 30"],
    example: { input: "t = [43, 12, 89, 7, 56], x = 56", output: "3" },
    functionName: "trouver_position",
    starterCode: `def trouver_position(t, x):
    # 1. Trie t par ordre croissant (tri par selection).
    # 2. Cherche x dans le tableau trie par dichotomie.
    pass
`,
    referenceSolution: `def trouver_position(t, x):
    t = list(t)
    n = len(t)
    for i in range(n):
        mini = i
        for j in range(i + 1, n):
            if t[j] < t[mini]:
                mini = j
        t[i], t[mini] = t[mini], t[i]

    deb = 0
    fin = n - 1
    p = -1
    while p == -1 and deb <= fin:
        m = (deb + fin) // 2
        if x > t[m]:
            deb = m + 1
        elif x < t[m]:
            fin = m - 1
        else:
            p = m
    return p
`,
    fixedCases: [
      { description: "Exemple (présent)", args: [[43, 12, 89, 7, 56], 56] },
      { description: "Absent", args: [[43, 12, 89, 7, 56], 100] },
    ],
    randomCase: () => {
      const n = 4 + Math.floor(Math.random() * 6);
      const t = Array.from({ length: n }, () => Math.floor(Math.random() * 100));
      const x = Math.random() < 0.5 ? t[Math.floor(Math.random() * n)] : 200;
      return [t, x];
    },
  },
  {
    id: "front-arithmetique-proprietes",
    topicId: "guerre",
    requiredTopicIds: ["calcul-arithmetique", "proprietes-numeriques"],
    title: "Front Arithmétique & Propriétés",
    difficulty: 3,
    sourceNote: "Combine 03_calcul_arithmetique.md (PPCM) et 10_...md (nombre oblong)",
    briefing:
      "Écris la fonction ppcm_oblong(a, b) qui calcule le PPCM de a et b, puis " +
      "le renvoie seulement s'il est oblong (produit de deux entiers " +
      "consécutifs) ; sinon renvoie -1.",
    constraints: ["1 ≤ a, b ≤ 200"],
    example: { input: "a = 3, b = 4", output: "12" },
    functionName: "ppcm_oblong",
    starterCode: `def ppcm_oblong(a, b):
    # 1. Calcule le PPCM de a et b.
    # 2. Renvoie-le s'il est oblong, sinon renvoie -1.
    pass
`,
    referenceSolution: `def ppcm_oblong(a, b):
    if a > b:
        maxi, mini = a, b
    else:
        maxi, mini = b, a
    m = maxi
    while m % mini != 0:
        m = m + maxi

    i = 0
    while i * (i + 1) < m:
        i = i + 1
    if i * (i + 1) == m:
        return m
    return -1
`,
    fixedCases: [
      { description: "PPCM oblong (12 = 3×4)", args: [3, 4] },
      { description: "PPCM non oblong", args: [5, 7] },
    ],
    randomCase: () => [
      1 + Math.floor(Math.random() * 200),
      1 + Math.floor(Math.random() * 200),
    ],
  },
  {
    id: "front-tableaux-enregistrements",
    topicId: "guerre",
    requiredTopicIds: ["tableaux-2d", "enregistrements-serie"],
    title: "Front Tableaux & Enregistrements",
    difficulty: 3,
    sourceNote: "Combine 09_tableaux_2d.md (parcours de matrice) et 11_...md (ELEVE)",
    briefing:
      "matrice est une liste de lignes (une ligne de notes par élève) et noms " +
      "la liste de leurs noms, alignée par position. Écris la fonction " +
      "meilleure_moyenne(matrice, noms) qui renvoie le nom de l'élève ayant " +
      "la meilleure moyenne.",
    constraints: ["2 ≤ len(matrice) ≤ 10", "chaque ligne a au moins 1 note"],
    example: {
      input: 'matrice = [[12, 14], [16, 18]]\nnoms = ["Ali", "Rim"]',
      output: '"Rim"',
    },
    functionName: "meilleure_moyenne",
    starterCode: `def meilleure_moyenne(matrice, noms):
    # Renvoie le nom de l'eleve ayant la meilleure moyenne de ligne.
    pass
`,
    referenceSolution: `def meilleure_moyenne(matrice, noms):
    meilleur = 0
    meilleure_moy = sum(matrice[0]) / len(matrice[0])
    for i in range(1, len(matrice)):
        moy = sum(matrice[i]) / len(matrice[i])
        if moy > meilleure_moy:
            meilleure_moy = moy
            meilleur = i
    return noms[meilleur]
`,
    tolerance: 1e-6,
    fixedCases: [
      {
        description: "Exemple",
        args: [[[12, 14], [16, 18]], ["Ali", "Rim"]],
      },
    ],
    randomCase: () => {
      const names = ["Ali", "Rim", "Omar", "Lyna"];
      const n = 2 + Math.floor(Math.random() * 2);
      const selected = names.slice(0, n);
      const matrice = selected.map(() =>
        Array.from({ length: 2 + Math.floor(Math.random() * 2) }, () =>
          Number((Math.random() * 20).toFixed(2)),
        ),
      );
      return [matrice, selected];
    },
  },
];

export function getWar(warId: string): War | undefined {
  return wars.find((war) => war.id === warId);
}

export function isWarUnlocked(war: War, clearedByTopic: Record<string, number>): boolean {
  return war.requiredTopicIds.every(
    (topicId) => (clearedByTopic[topicId] ?? 0) >= getExercisesForTopic(topicId).length,
  );
}
