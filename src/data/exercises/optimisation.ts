import { randomFloat, randomInt } from "../../lib/random";
import type { Exercise } from "./types";

export const optimisationExercises: Exercise[] = [
  {
    id: "ecart-minimal",
    topicId: "optimisation",
    title: "L'écart minimal",
    difficulty: 2,
    sourceNote: "Adapté de 06_optimisation.md — Exemple 2 (document_25077 (15).pdf)",
    briefing:
      "t est un tableau d'au moins deux entiers. Écris la fonction ecart_min(t) " +
      "qui renvoie le plus petit écart |t[i+1] - t[i]| entre deux éléments " +
      "successifs du tableau.",
    constraints: ["2 ≤ len(t) ≤ 30", "les éléments sont des entiers"],
    example: {
      input: "t = [12, 45, 7, 89, 23, 56]",
      output: "33",
    },
    functionName: "ecart_min",
    starterCode: `def ecart_min(t):
    # Renvoie le plus petit ecart entre deux elements successifs de t.
    pass
`,
    referenceSolution: `def ecart_min(t):
    mini = abs(t[1] - t[0])
    for i in range(1, len(t) - 1):
        ecart = abs(t[i + 1] - t[i])
        if ecart < mini:
            mini = ecart
    return mini
`,
    fixedCases: [{ description: "Exemple du cours", args: [[12, 45, 7, 89, 23, 56]] }],
    randomCase: () => {
      const n = randomInt(3, 10);
      const t = Array.from({ length: n }, () => randomInt(-50, 50));
      return [t];
    },
  },
  {
    id: "maximum-et-indice",
    topicId: "optimisation",
    title: "Le maximum et sa position",
    difficulty: 1,
    sourceNote: "Adapté de 06_optimisation.md — Exemple 1",
    briefing:
      "Écris la fonction maximum(t) qui renvoie un couple (valeur_max, indice) : " +
      "la valeur maximale du tableau t et l'indice de sa première occurrence.",
    constraints: ["1 ≤ len(t) ≤ 30"],
    example: { input: "t = [12, 45, 7, 89, 23, 56]", output: "(89, 3)" },
    functionName: "maximum",
    starterCode: `def maximum(t):
    # Renvoie un couple (valeur_max, indice).
    pass
`,
    referenceSolution: `def maximum(t):
    imax = 0
    for i in range(1, len(t)):
        if t[i] > t[imax]:
            imax = i
    return (t[imax], imax)
`,
    fixedCases: [{ description: "Exemple du cours", args: [[12, 45, 7, 89, 23, 56]] }],
    randomCase: () => {
      const n = randomInt(2, 10);
      return [Array.from({ length: n }, () => randomInt(-50, 50))];
    },
  },
  {
    id: "rectangle-inscrit-perimetre",
    topicId: "optimisation",
    title: "Le rectangle inscrit dans un cercle",
    difficulty: 2,
    sourceNote: "Adapté de 06_optimisation.md — Exercice 2",
    briefing:
      "Un rectangle de largeur x est inscrit dans un cercle de rayon r " +
      "(y = √(4r² - x²)). Écris la fonction perimetre(x, r) qui renvoie le " +
      "périmètre du rectangle, 2·(x + y).",
    constraints: ["r > 0", "0 < x < 2r"],
    example: { input: "x = 2, r = 2", output: "≈ 10.93" },
    functionName: "perimetre",
    starterCode: `def perimetre(x, r):
    # Renvoie le perimetre du rectangle inscrit dans le cercle de rayon r.
    pass
`,
    referenceSolution: `def perimetre(x, r):
    from math import sqrt
    y = sqrt(4 * r * r - x * x)
    return 2 * (x + y)
`,
    tolerance: 1e-6,
    fixedCases: [{ description: "Exemple", args: [2, 2] }],
    randomCase: () => {
      const r = randomFloat(1, 10, 2);
      const x = randomFloat(0.1, 1.9 * r, 2);
      return [x, r];
    },
  },
];
