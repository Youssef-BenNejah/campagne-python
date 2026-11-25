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
  {
    id: "ppcm",
    topicId: "calcul-arithmetique",
    title: "Le plus petit commun multiple",
    difficulty: 1,
    sourceNote: "Adapté de 03_calcul_arithmetique.md — fonction PPCM",
    briefing:
      "Écris la fonction ppcm(a, b) qui calcule le plus petit commun multiple " +
      "de deux entiers strictement positifs, en cherchant le plus petit " +
      "multiple du plus grand des deux qui est aussi multiple du plus petit.",
    constraints: ["1 ≤ a, b ≤ 500"],
    example: { input: "a = 4, b = 6", output: "12" },
    functionName: "ppcm",
    starterCode: `def ppcm(a, b):
    # Renvoie le PPCM de a et b.
    pass
`,
    referenceSolution: `def ppcm(a, b):
    if a > b:
        maxi, mini = a, b
    else:
        maxi, mini = b, a
    multiple = maxi
    while multiple % mini != 0:
        multiple = multiple + maxi
    return multiple
`,
    fixedCases: [
      { description: "Exemple du cours", args: [4, 6] },
      { description: "a multiple de b", args: [12, 4] },
    ],
    randomCase: () => [randomInt(1, 500), randomInt(1, 500)],
  },
  {
    id: "est-premier",
    topicId: "calcul-arithmetique",
    title: "Nombre premier ou non",
    difficulty: 1,
    sourceNote: "Adapté de 03_calcul_arithmetique.md — fonction premier, méthode 2",
    briefing:
      "Écris la fonction est_premier(n) qui renvoie True si n (entier > 1) est " +
      "premier, False sinon, en cherchant un diviseur entre 2 et n-1.",
    constraints: ["2 ≤ n ≤ 10000"],
    example: { input: "n = 17", output: "True" },
    functionName: "est_premier",
    starterCode: `def est_premier(n):
    # Renvoie True si n est premier, False sinon.
    pass
`,
    referenceSolution: `def est_premier(n):
    i = 1
    res = True
    while res and i != n - 1:
        i = i + 1
        res = n % i != 0
    return res
`,
    fixedCases: [
      { description: "Premier", args: [17] },
      { description: "Non premier", args: [21] },
      { description: "Plus petit premier", args: [2] },
    ],
    randomCase: () => [randomInt(2, 10000)],
  },
];
