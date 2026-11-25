import { useCallback, useEffect, useState } from "react";
import { aggregateSubmissions, type SubmissionRow } from "./progressStats";
import { supabase } from "./supabaseClient";
import { useAuth } from "./useAuth";

export type { SubmissionRow };

interface ProgressState {
  loading: boolean;
  xp: number;
  /** topicId -> count of distinct exercises passed at least once */
  clearedByTopic: Record<string, number>;
  /** exerciseId -> best (max) xp earned, deduped so resubmits can't farm XP */
  bestByExercise: Record<string, number>;
  /** topicId -> attempts/passes across every submission, for the weak-topic detector */
  statsByTopic: Record<string, { attempts: number; passes: number }>;
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
      .select(
        "id, exercise_id, topic_id, passed, xp_awarded, passed_count, total_count, created_at, cheat_flags",
      )
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

  const stats = aggregateSubmissions(rows);

  return {
    loading,
    xp: stats.xp,
    clearedByTopic: stats.clearedByTopic,
    bestByExercise: stats.bestByExercise,
    statsByTopic: stats.statsByTopic,
    history: rows,
    refresh: load,
  };
}
