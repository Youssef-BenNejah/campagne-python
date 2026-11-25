import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./useAuth";

export interface SubmissionRow {
  exercise_id: string;
  topic_id: string;
  passed: boolean;
  xp_awarded: number;
}

interface ProgressState {
  loading: boolean;
  xp: number;
  /** topicId -> count of distinct exercises passed at least once */
  clearedByTopic: Record<string, number>;
  /** exerciseId -> best (max) xp earned, deduped so resubmits can't farm XP */
  bestByExercise: Record<string, number>;
  refresh: () => void;
}

export function useProgress(): ProgressState {
  const { session } = useAuth();
  const [rows, setRows] = useState<SubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    if (!session) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("submissions")
      .select("exercise_id, topic_id, passed, xp_awarded")
      .eq("user_id", session.user.id)
      .eq("passed", true)
      .then(({ data, error }) => {
        if (error) {
          console.error("Impossible de charger la progression :", error.message);
          setRows([]);
        } else {
          setRows(data ?? []);
        }
        setLoading(false);
      });
  }, [session]);

  useEffect(() => {
    load();
  }, [load]);

  const bestByExercise: Record<string, number> = {};
  const clearedExercisesByTopic: Record<string, Set<string>> = {};

  for (const row of rows) {
    bestByExercise[row.exercise_id] = Math.max(bestByExercise[row.exercise_id] ?? 0, row.xp_awarded);
    (clearedExercisesByTopic[row.topic_id] ??= new Set()).add(row.exercise_id);
  }

  const clearedByTopic: Record<string, number> = {};
  for (const [topicId, exerciseIds] of Object.entries(clearedExercisesByTopic)) {
    clearedByTopic[topicId] = exerciseIds.size;
  }

  const xp = Object.values(bestByExercise).reduce((sum, value) => sum + value, 0);

  return { loading, xp, clearedByTopic, bestByExercise, refresh: load };
}
