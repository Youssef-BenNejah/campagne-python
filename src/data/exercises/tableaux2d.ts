import { randomInt } from "../../lib/random";
import type { Exercise } from "./types";

export const tableaux2dExercises: Exercise[] = [
  {
    id: "diagonale-principale",
    topicId: "tableaux-2d",
    title: "La diagonale principale",
    difficulty: 1,
    sourceNote: "Adapté de 09_tableaux_2d.md — diagonale_principale",
    briefing:
      "matrice est une matrice carrée n×n (liste de listes). Écris la fonction " +
      "diagonale_principale(matrice) qui renvoie la somme des éléments de sa " +
      "diagonale principale (matrice[i][i]).",
    constraints: ["2 ≤ n ≤ 10", "matrice est carrée (n lignes, n colonnes)"],
    example: {
      input: "matrice = [[2, 7, 6], [9, 5, 1], [4, 3, 8]]",
      output: "15",
    },
    functionName: "diagonale_principale",
    starterCode: `def diagonale_principale(matrice):
    # Renvoie la somme de la diagonale principale.
    pass
`,
    referenceSolution: `def diagonale_principale(matrice):
    s = 0
    for i in range(len(matrice)):
        s = s + matrice[i][i]
    return s
`,
    fixedCases: [
      { description: "Matrice magique du cours", args: [[[2, 7, 6], [9, 5, 1], [4, 3, 8]]] },
    ],
    randomCase: () => {
      const n = randomInt(2, 6);
      const matrice = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => randomInt(-20, 20)),
      );
      return [matrice];
    },
  },
];
