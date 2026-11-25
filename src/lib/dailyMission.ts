import { getExercisesForTopic, type Exercise } from "../data/exercises";
import { topics } from "../data/topics";

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Deterministic for a given day + progress snapshot (same pick on every
 * reload, changes at midnight or once it's cleared) — no backend storage
 * needed. Prioritizes the weakest topic when one stands out, otherwise any
 * not-yet-cleared exercise.
 */
export function pickDailyMission(
  clearedByTopic: Record<string, number>,
  statsByTopic: Record<string, { attempts: number; passes: number }>,
): { topicId: string; exercise: Exercise } | null {
  const today = new Date().toISOString().slice(0, 10);

  const pending: { topicId: string; exercise: Exercise }[] = [];
  for (const topic of topics) {
    const exercises = getExercisesForTopic(topic.id);
    const cleared = clearedByTopic[topic.id] ?? 0;
    if (cleared < exercises.length) {
      for (const exercise of exercises.slice(cleared)) {
        pending.push({ topicId: topic.id, exercise });
      }
    }
  }

  if (pending.length === 0) return null;

  let weakestTopic: string | null = null;
  let weakestAccuracy = Infinity;
  for (const [topicId, stats] of Object.entries(statsByTopic)) {
    if (stats.attempts < 2) continue;
    const accuracy = stats.passes / stats.attempts;
    if (accuracy < weakestAccuracy) {
      weakestAccuracy = accuracy;
      weakestTopic = topicId;
    }
  }

  const candidates = weakestTopic
    ? pending.filter((p) => p.topicId === weakestTopic)
    : pending;
  const pool = candidates.length > 0 ? candidates : pending;

  const index = hashString(today) % pool.length;
  return pool[index];
}
