import { randomFloat } from "../../lib/random";
import type { Exercise } from "./types";

export const approximationExercises: Exercise[] = [
  {
    id: "racine-heron",
    topicId: "approximation",
    title: "La racine carrée par la méthode de Héron",
    difficulty: 2,
    sourceNote: "Adapté de 07_approximation.md — racine_Heron (document_25077 (16).pdf)",
    briefing:
      "Écris la fonction racine_heron(n) qui calcule une valeur approchée de √n " +
      "par la méthode de Héron d'Alexandrie : x₀ = n/2, puis x(k+1) = (x(k) + n/x(k)) / 2, " +
      "jusqu'à ce que deux termes consécutifs diffèrent de moins de 1e-4.",
    constraints: ["n > 0"],
    example: { input: "n = 2", output: "≈ 1.41421356" },
    functionName: "racine_heron",
    starterCode: `def racine_heron(n):
    # Renvoie une valeur approchee de racine(n) par la methode de Heron.
    pass
`,
    referenceSolution: `def racine_heron(n):
    epsilon = 1e-4
    s2 = n / 2
    while True:
        s1 = s2
        s2 = (s1 + n / s1) / 2
        if abs(s2 - s1) < epsilon:
            break
    return s2
`,
    tolerance: 1e-3,
    fixedCases: [
      { description: "√2", args: [2] },
      { description: "Carré parfait", args: [16] },
    ],
    randomCase: () => [randomFloat(1, 500, 2)],
  },
];
