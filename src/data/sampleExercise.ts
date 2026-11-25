export interface TestCase {
  description: string;
  args: unknown[];
}

export interface Exercise {
  id: string;
  topicId: string;
  title: string;
  difficulty: 1 | 2 | 3;
  briefing: string;
  constraints: string[];
  example: { input: string; output: string };
  functionName: string;
  starterCode: string;
  referenceSolution: string;
  testCases: TestCase[];
}

/**
 * Adapted from "Problème 1 — Tri de deux tableaux parallèles" (01_tri.md,
 * source document_25077 (4).pdf). The original has the student read N from
 * the keyboard; here it's reframed as a pure function so it can be
 * auto-graded against hidden inputs instead of requiring stdin.
 */
export const sampleExercise: Exercise = {
  id: "tri-eleves-par-moyenne",
  topicId: "tri",
  title: "Le classement de la promo",
  difficulty: 1,
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
  testCases: [
    {
      description: "Exemple du cours (4 élèves)",
      args: [
        ["Ali", "Mohamed", "Meriem", "Sofienne"],
        [14, 13.5, 16, 16.25],
      ],
    },
    {
      description: "7 élèves, avec égalité de moyenne",
      args: [
        ["Ali", "Mohamed", "Meriem", "Sofienne", "Lyna", "Fatma", "Fedi"],
        [14, 13.5, 16, 16.25, 10, 18.5, 8.5],
      ],
    },
    {
      description: "Moyennes déjà triées",
      args: [
        ["A", "B", "C"],
        [18, 12, 5],
      ],
    },
    {
      description: "Toutes les moyennes égales (stabilité non exigée)",
      args: [
        ["A", "B", "C"],
        [10, 10, 10],
      ],
    },
  ],
};
