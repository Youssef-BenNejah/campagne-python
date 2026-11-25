import { FIRST_NAMES, randomFloat, shuffledSample } from "../../lib/random";
import type { Exercise } from "./types";

export const triExercises: Exercise[] = [
  {
    id: "tri-classement-promo",
    topicId: "tri",
    title: "Le classement de la promo",
    difficulty: 1,
    sourceNote: "Adapté de 01_tri.md — Problème 1 (document_25077 (4).pdf)",
    briefing:
      "Deux listes parallèles contiennent les noms et les moyennes de N élèves. " +
      "Écris la fonction classer(noms, moyennes) qui renvoie la liste des noms " +
      "triée par moyenne décroissante.",
    constraints: [
      "3 ≤ N ≤ 50",
      "0 ≤ moyenne ≤ 20",
      "Les deux listes ont la même longueur et sont alignées par position.",
    ],
    example: {
      input:
        'noms = ["Ali", "Mohamed", "Meriem", "Sofienne"]\nmoyennes = [14, 13.5, 16, 16.25]',
      output: '["Sofienne", "Meriem", "Ali", "Mohamed"]',
    },
    functionName: "classer",
    starterCode: `def classer(noms, moyennes):
    # Renvoie la liste des noms triee par moyenne decroissante.
    pass
`,
    referenceSolution: `def classer(noms, moyennes):
    n = len(noms)
    noms = list(noms)
    moyennes = list(moyennes)
    for i in range(n):
        maxi = i
        for j in range(i + 1, n):
            if moyennes[j] > moyennes[maxi]:
                maxi = j
        moyennes[i], moyennes[maxi] = moyennes[maxi], moyennes[i]
        noms[i], noms[maxi] = noms[maxi], noms[i]
    return noms
`,
    fixedCases: [
      {
        description: "Exemple du cours (4 élèves)",
        args: [
          ["Ali", "Mohamed", "Meriem", "Sofienne"],
          [14, 13.5, 16, 16.25],
        ],
      },
    ],
    randomCase: () => {
      const n = 4 + Math.floor(Math.random() * 4);
      const names = shuffledSample(FIRST_NAMES, n);
      const grades = names.map(() => randomFloat(0, 20, 2));
      return [names, grades];
    },
  },
];
