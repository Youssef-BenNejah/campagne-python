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
  {
    id: "somme-diviseurs-tableau",
    topicId: "analyse-modulaire",
    title: "La somme des diviseurs",
    difficulty: 1,
    sourceNote: "Adapté de 05_analyse_modulaire.md — Exercice 2",
    briefing:
      "Écris la fonction sommes_diviseurs(t) qui renvoie une nouvelle liste où " +
      "chaque élément est remplacé par la somme de ses diviseurs (y compris 1 " +
      "et lui-même).",
    constraints: ["2 ≤ len(t) ≤ 10", "10 ≤ élément ≤ 99"],
    example: { input: "t = [6, 43, 5]", output: "[12, 44, 6]" },
    functionName: "sommes_diviseurs",
    starterCode: `def sommes_diviseurs(t):
    # Renvoie la liste des sommes de diviseurs de chaque element de t.
    pass
`,
    referenceSolution: `def somme_diviseurs(n):
    s = 0
    for d in range(1, n + 1):
        if n % d == 0:
            s = s + d
    return s


def sommes_diviseurs(t):
    return [somme_diviseurs(n) for n in t]
`,
    fixedCases: [{ description: "Exemple du cours", args: [[6, 43, 5]] }],
    randomCase: () => {
      const n = randomInt(2, 6);
      return [Array.from({ length: n }, () => randomInt(10, 99))];
    },
  },
  {
    id: "filtrer-premiers",
    topicId: "analyse-modulaire",
    title: "Ne garder que les nombres premiers",
    difficulty: 2,
    sourceNote: "Adapté de 05_analyse_modulaire.md — Exercice 3",
    briefing:
      "Écris la fonction filtrer_premiers(t) qui renvoie une nouvelle liste " +
      "contenant uniquement les éléments premiers de t, dans l'ordre d'origine.",
    constraints: ["2 ≤ len(t) ≤ 10"],
    example: { input: "t = [10, 2, 18, 7, 43, 10]", output: "[2, 7, 43]" },
    functionName: "filtrer_premiers",
    starterCode: `def filtrer_premiers(t):
    # Renvoie les elements premiers de t, dans l'ordre.
    pass
`,
    referenceSolution: `def est_premier(n):
    if n < 2:
        return False
    i = 2
    while i < n and n % i != 0:
        i = i + 1
    return i == n


def filtrer_premiers(t):
    return [n for n in t if est_premier(n)]
`,
    fixedCases: [{ description: "Exemple du cours", args: [[10, 2, 18, 7, 43, 10]] }],
    randomCase: () => {
      const n = randomInt(3, 8);
      return [Array.from({ length: n }, () => randomInt(2, 50))];
    },
  },
];
