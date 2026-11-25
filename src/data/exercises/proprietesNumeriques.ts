import { randomInt } from "../../lib/random";
import type { Exercise } from "./types";

export const proprietesNumeriquesExercises: Exercise[] = [
  {
    id: "nombre-oblong",
    topicId: "proprietes-numeriques",
    title: "Les nombres oblongs",
    difficulty: 2,
    sourceNote: "Adapté de 10_corrections_proprietes_numeriques.md — Est_Oblong",
    briefing:
      "Un nombre est dit oblong s'il est le produit de deux entiers naturels " +
      "consécutifs (ex. 12 = 3×4, 272 = 16×17). Écris la fonction est_oblong(x) " +
      "qui renvoie True si x est oblong, False sinon.",
    constraints: ["1 ≤ x ≤ 9999"],
    example: { input: "x = 272", output: "True" },
    functionName: "est_oblong",
    starterCode: `def est_oblong(x):
    # Renvoie True si x est le produit de deux entiers consecutifs.
    pass
`,
    referenceSolution: `def est_oblong(x):
    i = 0
    while i * (i + 1) < x:
        i = i + 1
    return i * (i + 1) == x
`,
    fixedCases: [
      { description: "Oblong (272 = 16×17)", args: [272] },
      { description: "Non oblong", args: [100] },
    ],
    randomCase: () => {
      if (Math.random() < 0.5) {
        const i = randomInt(1, 99);
        return [i * (i + 1)];
      }
      return [randomInt(1, 9999)];
    },
  },
  {
    id: "k-parfait",
    topicId: "proprietes-numeriques",
    title: "Les nombres k-parfaits",
    difficulty: 2,
    sourceNote: "Adapté de 10_corrections_proprietes_numeriques.md — k-parfait",
    briefing:
      "Un nombre P est dit k-parfait si la somme de tous ses diviseurs positifs " +
      "(y compris 1 et lui-même) est égale à k×P. Écris la fonction " +
      "est_k_parfait(p, k) qui renvoie True ou False.",
    constraints: ["1 ≤ p ≤ 1000", "1 ≤ k ≤ 5"],
    example: { input: "p = 28, k = 2", output: "True" },
    functionName: "est_k_parfait",
    starterCode: `def est_k_parfait(p, k):
    # Renvoie True si p est k-parfait, False sinon.
    pass
`,
    referenceSolution: `def somme_div(p):
    s = 0
    for d in range(1, p + 1):
        if p % d == 0:
            s = s + d
    return s


def est_k_parfait(p, k):
    return somme_div(p) == k * p
`,
    fixedCases: [
      { description: "28 est 2-parfait", args: [28, 2] },
      { description: "120 est 3-parfait", args: [120, 3] },
      { description: "Non k-parfait", args: [10, 2] },
    ],
    randomCase: () => [randomInt(1, 1000), randomInt(1, 5)],
  },
  {
    id: "unitairement-parfait",
    topicId: "proprietes-numeriques",
    title: "Les nombres unitairement parfaits",
    difficulty: 3,
    sourceNote: "Adapté de 10_corrections_proprietes_numeriques.md — UnitParf",
    briefing:
      "Un diviseur unitaire D de N vérifie D | N et PGCD(D, N/D) = 1. N est dit " +
      "unitairement parfait s'il est égal à la somme de ses diviseurs unitaires " +
      "(sauf lui-même). Écris la fonction est_unitairement_parfait(n).",
    constraints: ["2 ≤ n ≤ 500"],
    example: { input: "n = 60", output: "True" },
    functionName: "est_unitairement_parfait",
    starterCode: `def est_unitairement_parfait(n):
    # Renvoie True si n est unitairement parfait, False sinon.
    pass
`,
    referenceSolution: `def pgcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a


def est_unitairement_parfait(n):
    s = 0
    for d in range(1, n):
        if n % d == 0 and pgcd(d, n // d) == 1:
            s = s + d
    return s == n
`,
    fixedCases: [
      { description: "60 est unitairement parfait", args: [60] },
      { description: "36 ne l'est pas", args: [36] },
    ],
    randomCase: () => [randomInt(2, 500)],
  },
];
