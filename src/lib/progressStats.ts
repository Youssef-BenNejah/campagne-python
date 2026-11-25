export interface SubmissionRow {
  id: string;
  exercise_id: string;
  topic_id: string;
  passed: boolean;
  xp_awarded: number;
  passed_count: number;
  total_count: number;
  created_at: string;
  cheat_flags?: unknown[];
}

export interface TopicStats {
  attempts: number;
  passes: number;
}

export interface ProgressStats {
  xp: number;
  clearedByTopic: Record<string, number>;
  bestByExercise: Record<string, number>;
  statsByTopic: Record<string, TopicStats>;
  totalCheatFlags: number;
}

/** Pure aggregation, shared by useProgress (the logged-in user) and the
 * mentor dashboard (read-only view of someone else's rows via RLS). */
export function aggregateSubmissions(rows: SubmissionRow[]): ProgressStats {
  const bestByExercise: Record<string, number> = {};
  const clearedExercisesByTopic: Record<string, Set<string>> = {};
  const statsByTopic: Record<string, TopicStats> = {};
  let totalCheatFlags = 0;

  for (const row of rows) {
    const stats = (statsByTopic[row.topic_id] ??= { attempts: 0, passes: 0 });
    stats.attempts += 1;
    totalCheatFlags += row.cheat_flags?.length ?? 0;
    if (row.passed) {
      stats.passes += 1;
      bestByExercise[row.exercise_id] = Math.max(
        bestByExercise[row.exercise_id] ?? 0,
        row.xp_awarded,
      );
      (clearedExercisesByTopic[row.topic_id] ??= new Set()).add(row.exercise_id);
    }
  }

  const clearedByTopic: Record<string, number> = {};
  for (const [topicId, exerciseIds] of Object.entries(clearedExercisesByTopic)) {
    clearedByTopic[topicId] = exerciseIds.size;
  }

  const xp = Object.values(bestByExercise).reduce((sum, value) => sum + value, 0);

  return { xp, clearedByTopic, bestByExercise, statsByTopic, totalCheatFlags };
}
