import { FIRST_NAMES, randomInt, shuffledSample } from "../../lib/random";
import type { Exercise } from "./types";

export const analyseModulaireExercises: Exercise[] = [
  {
    id: "conversion-majuscules",
    topicId: "analyse-modulaire",
    title: "Tout en majuscules",
    difficulty: 1,
    sourceNote: "Adapté de 05_analyse_modulaire.md — Exercice 1 (document_25077 (1).pdf)",
    briefing:
      "Écris la fonction convertir(mots) qui renvoie une nouvelle liste contenant " +
      "chaque chaîne de mots convertie en majuscules.",
    constraints: ["2 ≤ len(mots) ≤ 25"],
    example: {
      input: 'mots = ["Ahmed", "mahdi", "la1"]',
      output: '["AHMED", "MAHDI", "LA1"]',
    },
    functionName: "convertir",
    starterCode: `def convertir(mots):
    # Renvoie la liste des mots convertis en majuscules.
    pass
`,
    referenceSolution: `def convertir(mots):
    return [mot.upper() for mot in mots]
`,
    fixedCases: [
      { description: "Exemple du cours", args: [["Ahmed", "mahdi", "la1"]] },
    ],
    randomCase: () => {
      const n = randomInt(2, 6);
      return [shuffledSample(FIRST_NAMES, n).map((name) => name.toLowerCase())];
    },
  },
];
