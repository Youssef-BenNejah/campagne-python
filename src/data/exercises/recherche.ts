import { randomInt, randomSortedInts } from "../../lib/random";
import type { Exercise } from "./types";

export const rechercheExercises: Exercise[] = [
  {
    id: "recherche-dichotomique",
    topicId: "recherche",
    title: "Retrouver la position par dichotomie",
    difficulty: 1,
    sourceNote: "Adapté de 02_recherche.md — fonction dicho (document_25077 (5).pdf)",
    briefing:
      "t est un tableau d'entiers trié par ordre croissant. Écris la fonction " +
      "dicho(t, x) qui renvoie l'indice de x dans t par recherche dichotomique, " +
      "ou -1 si x n'est pas présent.",
    constraints: [
      "5 ≤ len(t) ≤ 20",
      "t est strictement croissant",
      "Le résultat doit utiliser la dichotomie, pas un simple parcours.",
    ],
    example: {
      input: "t = [2, 4, 5, 7, 8, 10, 13, 15, 16]\nx = 7",
      output: "3",
    },
    functionName: "dicho",
    starterCode: `def dicho(t, x):
    # Renvoie l'indice de x dans t (trie croissant), ou -1 si absent.
    pass
`,
    referenceSolution: `def dicho(t, x):
    deb = 0
    fin = len(t) - 1
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
      {
        description: "Exemple du cours (élément présent)",
        args: [[2, 4, 5, 7, 8, 10, 13, 15, 16], 7],
      },
      {
        description: "Élément absent",
        args: [[2, 4, 5, 7, 8, 10, 13, 15, 16], 11],
      },
    ],
    randomCase: () => {
      const n = randomInt(6, 15);
      const t = randomSortedInts(n, 1, 100);
      const searchExisting = Math.random() < 0.5;
      const x = searchExisting ? t[randomInt(0, n - 1)] : randomInt(101, 200);
      return [t, x];
    },
  },
];
