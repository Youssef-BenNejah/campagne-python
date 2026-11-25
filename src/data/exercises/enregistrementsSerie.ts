import { FIRST_NAMES, randomInt, shuffledSample } from "../../lib/random";
import type { Exercise } from "./types";

export const enregistrementsSerieExercises: Exercise[] = [
  {
    id: "joueur-gagnant",
    topicId: "enregistrements-serie",
    title: "Le joueur gagnant",
    difficulty: 1,
    sourceNote: "Adapté de 11_enregistrements_serie.md — Exercice 2 (JOUEUR, Gagnant)",
    briefing:
      "Un joueur est représenté par un dictionnaire avec les champs \"nom\" et " +
      '"score". Écris la fonction gagnant(j1, j2) qui renvoie le nom du joueur ' +
      "ayant le score le plus élevé (j1 en cas d'égalité).",
    constraints: ["0 ≤ score ≤ 1000"],
    example: {
      input: 'j1 = {"nom": "Ali", "score": 12}\nj2 = {"nom": "Omar", "score": 18}',
      output: '"Omar"',
    },
    functionName: "gagnant",
    starterCode: `def gagnant(j1, j2):
    # Renvoie le nom du joueur au score le plus eleve (j1 si egalite).
    pass
`,
    referenceSolution: `def gagnant(j1, j2):
    if j2["score"] > j1["score"]:
        return j2["nom"]
    return j1["nom"]
`,
    fixedCases: [
      {
        description: "Exemple du cours",
        args: [
          { nom: "Ali", score: 12 },
          { nom: "Omar", score: 18 },
        ],
      },
      {
        description: "Égalité (j1 gagne par convention)",
        args: [
          { nom: "Ali", score: 10 },
          { nom: "Omar", score: 10 },
        ],
      },
    ],
    randomCase: () => {
      const [n1, n2] = shuffledSample(FIRST_NAMES, 2);
      return [
        { nom: n1, score: randomInt(0, 1000) },
        { nom: n2, score: randomInt(0, 1000) },
      ];
    },
  },
];
