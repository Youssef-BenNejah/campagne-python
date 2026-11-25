import { FIRST_NAMES, randomFloat, randomInt, shuffledSample } from "../../lib/random";
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
  {
    id: "tri-croissant",
    topicId: "tri",
    title: "Trier par ordre croissant",
    difficulty: 1,
    sourceNote: "Adapté de 01_tri.md — tri par sélection (II bis)",
    briefing:
      "Écris la fonction tri_croissant(t) qui renvoie une nouvelle liste " +
      "contenant les éléments de t triés par ordre croissant (tri par sélection).",
    constraints: ["2 ≤ len(t) ≤ 30"],
    example: { input: "t = [43, 12, 89, 7, 56]", output: "[7, 12, 43, 56, 89]" },
    functionName: "tri_croissant",
    starterCode: `def tri_croissant(t):
    # Renvoie une nouvelle liste triee par ordre croissant.
    pass
`,
    referenceSolution: `def tri_croissant(t):
    t = list(t)
    n = len(t)
    for i in range(n):
        mini = i
        for j in range(i + 1, n):
            if t[j] < t[mini]:
                mini = j
        t[i], t[mini] = t[mini], t[i]
    return t
`,
    fixedCases: [{ description: "Exemple", args: [[43, 12, 89, 7, 56]] }],
    randomCase: () => {
      const n = randomInt(3, 10);
      return [Array.from({ length: n }, () => randomInt(-50, 50))];
    },
  },
  {
    id: "classement-hitparade",
    topicId: "tri",
    title: "Le Hitparade",
    difficulty: 2,
    sourceNote: "Adapté de 01_tri.md — Problème 5 (Hitparade)",
    briefing:
      "titres et scores sont deux listes parallèles (le score de titres[i] est " +
      "scores[i]). Écris la fonction classement(titres, scores) qui renvoie " +
      "la liste des titres triée par score décroissant.",
    constraints: ["3 ≤ len(titres) ≤ 10", "0 ≤ score ≤ 100"],
    example: {
      input: 'titres = ["Happy", "Sorry", "Rosa"]\nscores = [9, 6, 12]',
      output: '["Rosa", "Happy", "Sorry"]',
    },
    functionName: "classement",
    starterCode: `def classement(titres, scores):
    # Renvoie les titres tries par score decroissant.
    pass
`,
    referenceSolution: `def classement(titres, scores):
    titres = list(titres)
    scores = list(scores)
    n = len(titres)
    for i in range(n):
        maxi = i
        for j in range(i + 1, n):
            if scores[j] > scores[maxi]:
                maxi = j
        scores[i], scores[maxi] = scores[maxi], scores[i]
        titres[i], titres[maxi] = titres[maxi], titres[i]
    return titres
`,
    fixedCases: [
      { description: "Exemple", args: [["Happy", "Sorry", "Rosa"], [9, 6, 12]] },
    ],
    randomCase: () => {
      const n = randomInt(3, 5);
      const titles = shuffledSample(FIRST_NAMES, n);
      const scores = titles.map(() => randomInt(0, 100));
      return [titles, scores];
    },
  },
];
