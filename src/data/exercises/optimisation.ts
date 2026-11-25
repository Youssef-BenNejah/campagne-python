import { randomInt } from "../../lib/random";
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
];
