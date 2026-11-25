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
  {
    id: "pi-wallis",
    topicId: "approximation",
    title: "π par la formule de Wallis",
    difficulty: 2,
    sourceNote: "Adapté de 07_approximation.md — Pi_Wallis",
    briefing:
      "Écris la fonction pi_wallis() qui calcule une valeur approchée de π par " +
      "la formule de Wallis : π/2 = (2/1)×(2/3)×(4/3)×(4/5)×..., en répétant " +
      "jusqu'à ce que deux termes consécutifs diffèrent de moins de 1e-4.",
    constraints: ["Aucun paramètre — la fonction ne prend rien en entrée."],
    example: { input: "pi_wallis()", output: "≈ 3.14159" },
    functionName: "pi_wallis",
    starterCode: `def pi_wallis():
    # Renvoie une valeur approchee de pi (formule de Wallis).
    pass
`,
    referenceSolution: `def pi_wallis():
    epsilon = 1e-4
    p2 = 2
    p1 = 1
    num = 2
    den = 3
    i = 2
    while not (abs(2 * p2 - 2 * p1) < epsilon):
        p1 = p2
        p2 = p1 * (num / den)
        if i % 2 == 0:
            num = num + 2
        else:
            den = den + 2
        i = i + 1
    return 2 * p2
`,
    tolerance: 1e-2,
    fixedCases: [{ description: "Approximation de π", args: [] }],
    randomCaseCount: 0,
    randomCase: () => [],
  },
  {
    id: "pi-euler",
    topicId: "approximation",
    title: "π par la formule d'Euler",
    difficulty: 2,
    sourceNote: "Adapté de 07_approximation.md — Pi_Euler",
    briefing:
      "Écris la fonction pi_euler() qui calcule une valeur approchée de π par " +
      "la formule d'Euler : π²/6 = 1 + 1/2² + 1/3² + ..., jusqu'à ce que deux " +
      "termes consécutifs diffèrent de moins de 1e-4.",
    constraints: ["Aucun paramètre — la fonction ne prend rien en entrée."],
    example: { input: "pi_euler()", output: "≈ 3.14159" },
    functionName: "pi_euler",
    starterCode: `def pi_euler():
    # Renvoie une valeur approchee de pi (formule d'Euler).
    pass
`,
    referenceSolution: `def pi_euler():
    from math import sqrt
    epsilon = 1e-4
    s2 = 1
    i = 2
    while True:
        s1 = s2
        s2 = s1 + 1 / (i * i)
        i = i + 1
        if sqrt(6 * s2) - sqrt(6 * s1) < epsilon:
            break
    return sqrt(6 * s2)
`,
    tolerance: 1e-2,
    fixedCases: [{ description: "Approximation de π", args: [] }],
    randomCaseCount: 0,
    randomCase: () => [],
  },
];
