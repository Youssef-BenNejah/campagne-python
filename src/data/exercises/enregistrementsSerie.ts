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
    expectsLoop: false,
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
  {
    id: "eleve-meilleure-moyenne",
    topicId: "enregistrements-serie",
    title: "Le meilleur élève",
    difficulty: 1,
    sourceNote: "Adapté de 11_enregistrements_serie.md — Exercice 3 (ELEVE, Indice_Max)",
    briefing:
      "eleves est une liste d'enregistrements avec les champs \"nom\" et " +
      '"moyenne". Écris la fonction meilleur_eleve(eleves) qui renvoie le nom ' +
      "de l'élève ayant la moyenne la plus élevée (le premier en cas d'égalité).",
    constraints: ["2 ≤ len(eleves) ≤ 20", "0 ≤ moyenne ≤ 20"],
    example: {
      input:
        'eleves = [{"nom": "Ali", "moyenne": 12}, {"nom": "Rim", "moyenne": 16.5}]',
      output: '"Rim"',
    },
    functionName: "meilleur_eleve",
    starterCode: `def meilleur_eleve(eleves):
    # Renvoie le nom de l'eleve ayant la moyenne la plus elevee.
    pass
`,
    referenceSolution: `def meilleur_eleve(eleves):
    imax = 0
    for i in range(1, len(eleves)):
        if eleves[i]["moyenne"] > eleves[imax]["moyenne"]:
            imax = i
    return eleves[imax]["nom"]
`,
    fixedCases: [
      {
        description: "Exemple",
        args: [[{ nom: "Ali", moyenne: 12 }, { nom: "Rim", moyenne: 16.5 }]],
      },
    ],
    randomCase: () => {
      const n = randomInt(2, 6);
      const names = shuffledSample(FIRST_NAMES, n);
      return [names.map((nom) => ({ nom, moyenne: Number(randomInt(0, 2000) / 100) }))];
    },
  },
  {
    id: "adherent-bonus-anciennete",
    topicId: "enregistrements-serie",
    title: "Le bonus d'ancienneté",
    difficulty: 2,
    sourceNote: "Adapté de 11_enregistrements_serie.md — Exercice 5 (ADHERENT)",
    briefing:
      'Un adhérent est un dictionnaire avec les champs "annee" et "mois" ' +
      "(date d'adhésion). Écris la fonction bonus(adherent, annee_actuelle, " +
      "mois_actuel) qui renvoie le nombre d'heures offertes : l'ancienneté en " +
      "mois si elle dépasse 60 mois (5 ans), 0 sinon. Ancienneté = " +
      "(annee_actuelle - annee)×12 + (mois_actuel - mois).",
    expectsLoop: false,
    constraints: ["2000 ≤ annee ≤ annee_actuelle", "1 ≤ mois, mois_actuel ≤ 12"],
    example: {
      input: 'adherent = {"annee": 2015, "mois": 1}, annee_actuelle = 2021, mois_actuel = 3',
      output: "74",
    },
    functionName: "bonus",
    starterCode: `def bonus(adherent, annee_actuelle, mois_actuel):
    # Renvoie le bonus en heures (anciennete en mois si > 60, sinon 0).
    pass
`,
    referenceSolution: `def anciennete(adherent, annee_actuelle, mois_actuel):
    return (annee_actuelle - adherent["annee"]) * 12 + (mois_actuel - adherent["mois"])


def bonus(adherent, annee_actuelle, mois_actuel):
    anc = anciennete(adherent, annee_actuelle, mois_actuel)
    if anc > 60:
        return anc
    return 0
`,
    fixedCases: [
      {
        description: "Exemple du cours (74 mois d'ancienneté)",
        args: [{ annee: 2015, mois: 1 }, 2021, 3],
      },
      {
        description: "Ancienneté insuffisante",
        args: [{ annee: 2019, mois: 1 }, 2021, 3],
      },
    ],
    randomCase: () => {
      const anneeActuelle = randomInt(2015, 2026);
      const moisActuel = randomInt(1, 12);
      const annee = randomInt(2000, anneeActuelle);
      const mois = randomInt(1, 12);
      return [{ annee, mois }, anneeActuelle, moisActuel];
    },
  },
];
