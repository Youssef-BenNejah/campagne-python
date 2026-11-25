import type { Difficulty } from "../data/topics";

const BASE_XP: Record<Difficulty, number> = { 1: 50, 2: 100, 3: 150 };

/** XP only comes from a fully-passed submission, reduced by any cheat penalty. */
export function computeXpAwarded(
  difficulty: Difficulty,
  allPassed: boolean,
  cheatPenalty: number,
): number {
  if (!allPassed) return 0;
  return Math.max(0, BASE_XP[difficulty] - cheatPenalty);
}
