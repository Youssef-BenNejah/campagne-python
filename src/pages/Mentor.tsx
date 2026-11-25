import { useEffect, useState } from "react";
import { topics } from "../data/topics";
import { aggregateSubmissions, type SubmissionRow } from "../lib/progressStats";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../lib/useAuth";

interface Mentee {
  id: string;
  display_name: string | null;
  rows: SubmissionRow[];
}

function topicLabel(topicId: string): string {
  if (topicId === "guerre") return "Front";
  return topics.find((t) => t.id === topicId)?.name ?? topicId;
}

export function Mentor() {
  const { session } = useAuth();
  const [mentees, setMentees] = useState<Mentee[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    let ignore = false;

    async function load() {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, display_name")
        .eq("mentor_id", session!.user.id);

      if (profilesError) {
        if (!ignore) setError(profilesError.message);
        return;
      }

      const withRows: Mentee[] = [];
      for (const profile of profiles ?? []) {
        const { data: rows, error: rowsError } = await supabase
          .from("submissions")
          .select(
            "id, exercise_id, topic_id, passed, xp_awarded, passed_count, total_count, created_at, cheat_flags",
          )
          .eq("user_id", profile.id)
          .order("created_at", { ascending: false })
          .limit(50);

        if (rowsError) {
          if (!ignore) setError(rowsError.message);
          return;
        }

        withRows.push({ id: profile.id, display_name: profile.display_name, rows: rows ?? [] });
      }

      if (!ignore) setMentees(withRows);
    }

    load();
    return () => {
      ignore = true;
    };
  }, [session]);

  return (
    <div className="mx-auto max-w-4xl px-5 py-8">
      <h1 className="font-display text-2xl font-semibold text-paper-100">Tableau de bord mentor</h1>
      <p className="mt-1 max-w-prose text-sm text-olive-400">
        Progression, score et signalements des personnes qui t'ont désigné comme mentor. Pour
        lier un compte, mets à jour sa colonne mentor_id dans Supabase (voir le commentaire dans
        supabase/migrations/0001_init.sql).
      </p>

      {error && (
        <p role="alert" className="mt-4 text-sm text-signal-danger-strong">
          {error}
        </p>
      )}

      {!error && mentees === null && (
        <p role="status" aria-busy="true" className="mt-6 font-mono text-sm text-olive-400">
          Chargement…
        </p>
      )}

      {mentees !== null && mentees.length === 0 && (
        <p className="mt-6 text-sm text-paper-300">
          Tu n'es mentor de personne pour l'instant.
        </p>
      )}

      <div className="mt-6 space-y-6">
        {mentees?.map((mentee) => (
          <MenteeCard key={mentee.id} mentee={mentee} />
        ))}
      </div>
    </div>
  );
}

function MenteeCard({ mentee }: { mentee: Mentee }) {
  const stats = aggregateSubmissions(mentee.rows);
  const recent = mentee.rows.slice(0, 10);

  return (
    <section className="border border-olive-600 bg-bunker-900">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-olive-600 px-4 py-3">
        <h2 className="font-display text-lg font-medium text-paper-100">
          {mentee.display_name ?? mentee.id}
        </h2>
        <div className="flex gap-4 font-mono text-xs text-olive-400">
          <span>{stats.xp} XP</span>
          <span>{mentee.rows.length} tentatives</span>
          {stats.totalCheatFlags > 0 && (
            <span className="text-signal-danger-strong">
              {stats.totalCheatFlags} signalement{stats.totalCheatFlags > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </header>

      {recent.length === 0 ? (
        <p className="px-4 py-3 text-sm text-paper-300">Aucune activité pour l'instant.</p>
      ) : (
        <ul className="divide-y divide-bunker-800">
          {recent.map((row) => (
            <li
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 font-mono text-xs"
            >
              <div className="flex items-center gap-3">
                <span
                  className={row.passed ? "text-signal-success-strong" : "text-signal-danger-strong"}
                >
                  {row.passed ? "✓" : "✗"}
                </span>
                <span className="text-olive-400">{topicLabel(row.topic_id)}</span>
                <span className="text-paper-200">{row.exercise_id}</span>
              </div>
              <div className="flex items-center gap-3 text-olive-400">
                {(row.cheat_flags?.length ?? 0) > 0 && (
                  <span className="text-signal-danger-strong">
                    {row.cheat_flags!.length} signalement{row.cheat_flags!.length > 1 ? "s" : ""}
                  </span>
                )}
                <time dateTime={row.created_at}>
                  {new Date(row.created_at).toLocaleDateString("fr-TN", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
