import { randomInt } from "../../lib/random";
import type { Exercise } from "./types";

export const calculArithmetiqueExercises: Exercise[] = [
  {
    id: "pgcd-euclide",
    topicId: "calcul-arithmetique",
    title: "Le PGCD par la méthode d'Euclide",
    difficulty: 1,
    sourceNote: "Adapté de 03_calcul_arithmetique.md — fonction PGCD (document_25077 (13).pdf)",
    briefing:
      "Écris la fonction pgcd(a, b) qui calcule le plus grand commun diviseur " +
      "de deux entiers strictement positifs par la méthode d'Euclide : " +
      "PGCD(a, b) = PGCD(b, a mod b), jusqu'à ce que b vaille 0.",
    constraints: ["1 ≤ a, b ≤ 10000", "a et b sont strictement positifs"],
    example: { input: "a = 15, b = 27", output: "3" },
    functionName: "pgcd",
    starterCode: `def pgcd(a, b):
    # Renvoie le PGCD de a et b (methode d'Euclide).
    pass
`,
    referenceSolution: `def pgcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
`,
    fixedCases: [
      { description: "Exemple du cours", args: [15, 27] },
      { description: "Un diviseur de l'autre", args: [12, 48] },
      { description: "Nombres premiers entre eux", args: [17, 25] },
    ],
    randomCase: () => [randomInt(1, 10000), randomInt(1, 10000)],
  },
];
