import { randomInt } from "../../lib/random";
import type { Exercise } from "./types";

export const proprietesNumeriquesExercises: Exercise[] = [
  {
    id: "nombre-oblong",
    topicId: "proprietes-numeriques",
    title: "Les nombres oblongs",
    difficulty: 2,
    sourceNote: "Adapté de 10_corrections_proprietes_numeriques.md — Est_Oblong",
    briefing:
      "Un nombre est dit oblong s'il est le produit de deux entiers naturels " +
      "consécutifs (ex. 12 = 3×4, 272 = 16×17). Écris la fonction est_oblong(x) " +
      "qui renvoie True si x est oblong, False sinon.",
    constraints: ["1 ≤ x ≤ 9999"],
    example: { input: "x = 272", output: "True" },
    functionName: "est_oblong",
    starterCode: `def est_oblong(x):
    # Renvoie True si x est le produit de deux entiers consecutifs.
    pass
`,
    referenceSolution: `def est_oblong(x):
    i = 0
    while i * (i + 1) < x:
        i = i + 1
    return i * (i + 1) == x
`,
    fixedCases: [
      { description: "Oblong (272 = 16×17)", args: [272] },
      { description: "Non oblong", args: [100] },
    ],
    randomCase: () => {
      if (Math.random() < 0.5) {
        const i = randomInt(1, 99);
        return [i * (i + 1)];
      }
      return [randomInt(1, 9999)];
    },
  },
];
