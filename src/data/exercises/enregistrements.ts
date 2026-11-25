import { randomFloat } from "../../lib/random";
import type { Exercise } from "./types";

export const enregistrementsExercises: Exercise[] = [
  {
    id: "rectangle-surface",
    topicId: "enregistrements",
    title: "La surface du rectangle",
    difficulty: 1,
    sourceNote: "Adapté de 04_enregistrements.md — enregistrement RECTANGLE",
    briefing:
      "Un rectangle est représenté par un enregistrement (dictionnaire Python) avec " +
      'les champs "longueur" et "largeur". Écris la fonction surface(rectangle) ' +
      "qui renvoie son aire.",
    constraints: ["0 < longueur ≤ 500", "0 < largeur ≤ 500"],
    example: {
      input: 'rectangle = {"longueur": 5, "largeur": 3}',
      output: "15",
    },
    functionName: "surface",
    starterCode: `def surface(rectangle):
    # Renvoie l'aire du rectangle (champs "longueur" et "largeur").
    pass
`,
    referenceSolution: `def surface(rectangle):
    return rectangle["longueur"] * rectangle["largeur"]
`,
    fixedCases: [
      { description: "Exemple du cours", args: [{ longueur: 5, largeur: 3 }] },
    ],
    randomCase: () => [
      { longueur: randomFloat(1, 500, 1), largeur: randomFloat(1, 500, 1) },
    ],
  },
];
