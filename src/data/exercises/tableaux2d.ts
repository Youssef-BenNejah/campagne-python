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
  {
    id: "diagonale-secondaire",
    topicId: "tableaux-2d",
    title: "La diagonale secondaire",
    difficulty: 1,
    sourceNote: "Adapté de 09_tableaux_2d.md — diagonale_secondaire",
    briefing:
      "matrice est une matrice carrée n×n. Écris la fonction " +
      "diagonale_secondaire(matrice) qui renvoie la somme des éléments de sa " +
      "diagonale secondaire (matrice[i][n-1-i]).",
    constraints: ["2 ≤ n ≤ 10"],
    example: {
      input: "matrice = [[2, 7, 6], [9, 5, 1], [4, 3, 8]]",
      output: "15",
    },
    functionName: "diagonale_secondaire",
    starterCode: `def diagonale_secondaire(matrice):
    # Renvoie la somme de la diagonale secondaire.
    pass
`,
    referenceSolution: `def diagonale_secondaire(matrice):
    n = len(matrice)
    s = 0
    for i in range(n):
        s = s + matrice[i][n - 1 - i]
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
  {
    id: "matrice-symetrique",
    topicId: "tableaux-2d",
    title: "Une matrice symétrique ?",
    difficulty: 2,
    sourceNote: "Adapté de 09_tableaux_2d.md — est_symetrique",
    briefing:
      "matrice est une matrice carrée n×n. Écris la fonction " +
      "est_symetrique(matrice) qui renvoie True si matrice[i][j] == matrice[j][i] " +
      "pour tous i, j, False sinon.",
    constraints: ["2 ≤ n ≤ 8"],
    example: {
      input: "matrice = [[1, 2, 3], [2, 5, 6], [3, 6, 9]]",
      output: "True",
    },
    functionName: "est_symetrique",
    starterCode: `def est_symetrique(matrice):
    # Renvoie True si la matrice est symetrique, False sinon.
    pass
`,
    referenceSolution: `def est_symetrique(matrice):
    n = len(matrice)
    for i in range(n):
        for j in range(n):
            if matrice[i][j] != matrice[j][i]:
                return False
    return True
`,
    fixedCases: [
      { description: "Symétrique", args: [[[1, 2, 3], [2, 5, 6], [3, 6, 9]]] },
      { description: "Non symétrique", args: [[[1, 2], [3, 4]]] },
    ],
    randomCase: () => {
      const n = randomInt(2, 5);
      const matrice = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => randomInt(-10, 10)),
      );
      if (Math.random() < 0.5) {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < i; j++) {
            matrice[j][i] = matrice[i][j];
          }
        }
      }
      return [matrice];
    },
  },
];
