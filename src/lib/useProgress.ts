import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./useAuth";

export interface SubmissionRow {
  id: string;
  exercise_id: string;
  topic_id: string;
  passed: boolean;
  xp_awarded: number;
  passed_count: number;
  total_count: number;
  created_at: string;
}

interface TopicStats {
  attempts: number;
  passes: number;
}

interface ProgressState {
  loading: boolean;
  xp: number;
  /** topicId -> count of distinct exercises passed at least once */
  clearedByTopic: Record<string, number>;
  /** exerciseId -> best (max) xp earned, deduped so resubmits can't farm XP */
  bestByExercise: Record<string, number>;
  /** topicId -> attempts/passes across every submission, for the weak-topic detector */
  statsByTopic: Record<string, TopicStats>;
  /** All submissions, most recent first — the campaign journal. */
  history: SubmissionRow[];
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
      .select("id, exercise_id, topic_id, passed, xp_awarded, passed_count, total_count, created_at")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
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
  const statsByTopic: Record<string, TopicStats> = {};

  for (const row of rows) {
    const stats = (statsByTopic[row.topic_id] ??= { attempts: 0, passes: 0 });
    stats.attempts += 1;
    if (row.passed) {
      stats.passes += 1;
      bestByExercise[row.exercise_id] = Math.max(bestByExercise[row.exercise_id] ?? 0, row.xp_awarded);
      (clearedExercisesByTopic[row.topic_id] ??= new Set()).add(row.exercise_id);
    }
  }

  const clearedByTopic: Record<string, number> = {};
  for (const [topicId, exerciseIds] of Object.entries(clearedExercisesByTopic)) {
    clearedByTopic[topicId] = exerciseIds.size;
  }

  const xp = Object.values(bestByExercise).reduce((sum, value) => sum + value, 0);

  return { loading, xp, clearedByTopic, bestByExercise, statsByTopic, history: rows, refresh: load };
}
