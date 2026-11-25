import { FIRST_NAMES, randomFloat, randomInt, shuffledSample } from "../../lib/random";
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
  {
    id: "rectangle-perimetre",
    topicId: "enregistrements",
    title: "Le périmètre du rectangle",
    difficulty: 1,
    sourceNote: "Adapté de 04_enregistrements.md — enregistrement RECTANGLE",
    briefing:
      "Même enregistrement rectangle (champs \"longueur\" et \"largeur\"). " +
      "Écris la fonction perimetre(rectangle) qui renvoie son périmètre.",
    constraints: ["0 < longueur ≤ 500", "0 < largeur ≤ 500"],
    example: { input: 'rectangle = {"longueur": 5, "largeur": 3}', output: "16" },
    functionName: "perimetre",
    starterCode: `def perimetre(rectangle):
    # Renvoie le perimetre du rectangle.
    pass
`,
    referenceSolution: `def perimetre(rectangle):
    return 2 * (rectangle["longueur"] + rectangle["largeur"])
`,
    fixedCases: [{ description: "Exemple", args: [{ longueur: 5, largeur: 3 }] }],
    randomCase: () => [
      { longueur: randomFloat(1, 500, 1), largeur: randomFloat(1, 500, 1) },
    ],
  },
  {
    id: "moyenne-classe",
    topicId: "enregistrements",
    title: "La moyenne de la classe",
    difficulty: 2,
    sourceNote: "Adapté de 04_enregistrements.md — Exercice 4 (ETUDIANT)",
    briefing:
      "etudiants est une liste d'enregistrements avec les champs \"nom\" et " +
      '"note". Écris la fonction moyenne(etudiants) qui renvoie la moyenne ' +
      "de la classe (moyenne de toutes les notes).",
    constraints: ["1 ≤ len(etudiants) ≤ 40", "0 ≤ note ≤ 20"],
    example: {
      input: 'etudiants = [{"nom": "Ali", "note": 12}, {"nom": "Rim", "note": 16}]',
      output: "14.0",
    },
    functionName: "moyenne",
    starterCode: `def moyenne(etudiants):
    # Renvoie la moyenne des notes de la classe.
    pass
`,
    referenceSolution: `def moyenne(etudiants):
    s = 0
    for e in etudiants:
        s = s + e["note"]
    return s / len(etudiants)
`,
    fixedCases: [
      {
        description: "Exemple",
        args: [[{ nom: "Ali", note: 12 }, { nom: "Rim", note: 16 }]],
      },
    ],
    randomCase: () => {
      const n = randomInt(2, 10);
      const names = shuffledSample(FIRST_NAMES, Math.min(n, FIRST_NAMES.length));
      const etudiants = Array.from({ length: n }, (_, i) => ({
        nom: names[i % names.length],
        note: randomFloat(0, 20, 2),
      }));
      return [etudiants];
    },
  },
];
