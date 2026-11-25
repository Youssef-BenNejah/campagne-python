import type { Difficulty } from "../topics";

export interface TestCase {
  description: string;
  args: unknown[];
}

export interface Exercise {
  id: string;
  topicId: string;
  title: string;
  difficulty: Difficulty;
  briefing: string;
  constraints: string[];
  example: { input: string; output: string };
  functionName: string;
  starterCode: string;
  referenceSolution: string;
  /** Traceability back to the source PDF/markdown this was adapted from. */
  sourceNote: string;
  /** Looser float comparison for approximation exercises; default 1e-9. */
  tolerance?: number;
  /** False only for pure-formula exercises; used for the "as-tu pensé à une boucle ?" nudge. */
  expectsLoop?: boolean;
  /** Worked example(s) straight from the course material. */
  fixedCases: TestCase[];
  /** Produces fresh valid arguments respecting the stated constraints — this
   * is what makes a "battle" different every attempt instead of memorizable. */
  randomCase: () => unknown[];
  randomCaseCount?: number;
}

export function buildTestCases(exercise: Exercise): TestCase[] {
  const randomCount = exercise.randomCaseCount ?? 3;
  const randomCases: TestCase[] = Array.from({ length: randomCount }, (_, i) => ({
    description: `Cas aléatoire ${i + 1}`,
    args: exercise.randomCase(),
  }));
  return [...exercise.fixedCases, ...randomCases];
}
