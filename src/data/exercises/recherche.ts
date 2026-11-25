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
  {
    id: "recherche-sequentielle-bool",
    topicId: "recherche",
    title: "Présent ou absent ?",
    difficulty: 1,
    sourceNote: "Adapté de 02_recherche.md — fonction RechSeq",
    briefing:
      "t n'est pas forcément trié. Écris la fonction est_present(t, x) qui " +
      "parcourt t et renvoie True si x s'y trouve, False sinon.",
    constraints: ["1 ≤ len(t) ≤ 30"],
    example: { input: "t = [4, 9, 2, 7], x = 2", output: "True" },
    functionName: "est_present",
    starterCode: `def est_present(t, x):
    # Renvoie True si x est dans t, False sinon.
    pass
`,
    referenceSolution: `def est_present(t, x):
    for valeur in t:
        if valeur == x:
            return True
    return False
`,
    fixedCases: [
      { description: "Présent", args: [[4, 9, 2, 7], 2] },
      { description: "Absent", args: [[4, 9, 2, 7], 5] },
    ],
    randomCase: () => {
      const n = randomInt(3, 12);
      const t = Array.from({ length: n }, () => randomInt(1, 50));
      const x = Math.random() < 0.5 ? t[randomInt(0, n - 1)] : randomInt(51, 100);
      return [t, x];
    },
  },
  {
    id: "recherche-sequentielle-position",
    topicId: "recherche",
    title: "À quel rang ?",
    difficulty: 1,
    sourceNote: "Adapté de 02_recherche.md — IV, correction « rechercher »",
    briefing:
      "t n'est pas forcément trié. Écris la fonction position(t, x) qui renvoie " +
      "l'indice de la première occurrence de x dans t, ou -1 si x est absent.",
    constraints: ["1 ≤ len(t) ≤ 30"],
    example: { input: "t = [4, 9, 2, 7], x = 7", output: "3" },
    functionName: "position",
    starterCode: `def position(t, x):
    # Renvoie l'indice de x dans t, ou -1 si absent.
    pass
`,
    referenceSolution: `def position(t, x):
    for i in range(len(t)):
        if t[i] == x:
            return i
    return -1
`,
    fixedCases: [{ description: "Exemple", args: [[4, 9, 2, 7], 7] }],
    randomCase: () => {
      const n = randomInt(3, 12);
      const t = Array.from({ length: n }, () => randomInt(1, 50));
      const x = Math.random() < 0.5 ? t[randomInt(0, n - 1)] : randomInt(51, 100);
      return [t, x];
    },
  },
];
