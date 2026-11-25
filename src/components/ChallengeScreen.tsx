import { useCallback, useEffect, useRef, useState } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";
import { Link } from "react-router-dom";
import type { Exercise } from "../data/exercises";
import { gradeSubmission, type GradeReport } from "../lib/grade";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../lib/useAuth";
import { CHEAT_PENALTY, useCheatWatch } from "../lib/useCheatWatch";
import { useProgress } from "../lib/useProgress";
import { computeXpAwarded } from "../lib/xp";
import { CodeEditor } from "./CodeEditor";
import { DossierPanel } from "./DossierPanel";
import { HintsPanel } from "./HintsPanel";
import { TracePanel } from "./TracePanel";
import { VerdictStamp } from "./VerdictStamp";

const EXAM_DURATION_SECONDS: Record<Exercise["difficulty"], number> = {
  1: 8 * 60,
  2: 12 * 60,
  3: 18 * 60,
};

function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Shared by a topic battle (/secteur/:topicId/:exerciseId) and a war
 * (/guerre/:warId) — both grade, persist and give feedback the same way;
 * only the breadcrumb and the topic_id recorded on the submission differ.
 */
export function ChallengeScreen({
  exercise,
  backTo,
  backLabel,
  submissionTopicId,
}: {
  exercise: Exercise;
  backTo: string;
  backLabel: string;
  submissionTopicId: string;
}) {
  const [code, setCode] = useState(exercise.starterCode);
  const [report, setReport] = useState<GradeReport | null>(null);
  const [xpAwarded, setXpAwarded] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "running">("idle");
  const [examMode, setExamMode] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const autoSubmittedRef = useRef(false);
  const cheat = useCheatWatch(true);
  const { session } = useAuth();
  const { refresh } = useProgress();

  useEffect(() => {
    setCode(exercise.starterCode);
    setReport(null);
    setXpAwarded(null);
    setExamMode(false);
    setRemainingSeconds(null);
    autoSubmittedRef.current = false;
    cheat.reset();
    // Deliberately only re-runs when the challenge identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);

  const basePenalty = cheat.flags.reduce((sum, flag) => sum + CHEAT_PENALTY[flag.kind], 0);
  const penalty = examMode ? basePenalty * 2 : basePenalty;

  const handleSubmit = useCallback(async () => {
    setStatus("running");
    try {
      const result = await gradeSubmission(exercise, code);
      setReport(result);

      const allPassed = !result.compileError && result.passedCount === result.totalCount;
      const xp = computeXpAwarded(exercise.difficulty, allPassed, penalty);
      setXpAwarded(xp);

      if (session) {
        const { error } = await supabase.from("submissions").insert({
          user_id: session.user.id,
          exercise_id: exercise.id,
          topic_id: submissionTopicId,
          difficulty: exercise.difficulty,
          code,
          passed: allPassed,
          passed_count: result.passedCount,
          total_count: result.totalCount,
          xp_awarded: xp,
          cheat_flags: cheat.flags,
          exam_mode: examMode,
        });
        if (error) {
          console.error("Impossible d'enregistrer la soumission :", error.message);
        } else {
          refresh();
        }
      }
    } finally {
      setStatus("idle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise, code, session, penalty, examMode, submissionTopicId]);

  const handleSubmitRef = useRef(handleSubmit);
  handleSubmitRef.current = handleSubmit;

  useEffect(() => {
    if (remainingSeconds === null) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          if (!autoSubmittedRef.current) {
            autoSubmittedRef.current = true;
            handleSubmitRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingSeconds !== null]);

  function startExam() {
    setExamMode(true);
    setRemainingSeconds(EXAM_DURATION_SECONDS[exercise.difficulty]);
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link to={backTo} className="font-mono text-xs text-olive-400 hover:text-paper-200">
          ← {backLabel}
        </Link>
        <div className="flex items-center gap-3">
          {examMode && remainingSeconds !== null && (
            <span
              role="timer"
              className={
                "font-mono text-sm " +
                (remainingSeconds < 60 ? "text-signal-danger-strong" : "text-brass-400")
              }
            >
              ⏱ {formatClock(remainingSeconds)}
            </span>
          )}
          {cheat.flags.length > 0 && (
            <p role="status" className="font-mono text-xs text-signal-danger-strong">
              {cheat.flags.length} signalement{cheat.flags.length > 1 ? "s" : ""} (−{penalty} pts)
            </p>
          )}
        </div>
      </div>

      {examMode && (
        <p role="status" className="border border-brass-600 bg-brass-500/10 px-3 py-2 font-mono text-xs text-brass-300">
          Mode examen actif : pas d'indice, pénalités doublées, soumission automatique à 0:00.
        </p>
      )}

      <div className="grid gap-0 border border-olive-600 lg:grid-cols-2">
        <DossierPanel label={`Difficulté ${exercise.difficulty}/3`} title={exercise.title}>
          <p>{exercise.briefing}</p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            {exercise.constraints.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="border border-paper-300 bg-paper-100 p-3 font-mono text-xs">
            <p className="whitespace-pre-wrap">{exercise.example.input}</p>
            <p className="mt-2 text-paper-ink/60">→ {exercise.example.output}</p>
          </div>
        </DossierPanel>

        <div className="flex h-80 flex-col lg:h-auto">
          <CodeEditor
            label={`def ${exercise.functionName}(...)`}
            value={code}
            onChange={setCode}
            onPaste={cheat.reportPaste}
            readOnly={examMode && report !== null}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === "running" || (examMode && report !== null)}
          className="bg-brass-500 px-4 py-2 font-display text-sm font-medium tracking-wide text-bunker-950 transition-colors hover:bg-brass-400 disabled:opacity-50"
        >
          {status === "running" ? "Exécution…" : "Lancer la mission"}
        </button>
        {status === "running" && (
          <span role="status" aria-live="polite" className="font-mono text-xs text-olive-400">
            Démarrage de l'interpréteur Python…
          </span>
        )}
        {!examMode && !report && (
          <button
            type="button"
            onClick={startExam}
            className="ml-auto border border-olive-500 px-3 py-1.5 font-mono text-xs text-olive-400 hover:border-brass-500 hover:text-brass-400"
          >
            Activer le mode examen ({Math.round(EXAM_DURATION_SECONDS[exercise.difficulty] / 60)}{" "}
            min, sans indice, pénalités ×2)
          </button>
        )}
      </div>

      {report && (
        <AfterActionReport report={report} xpAwarded={xpAwarded} exercise={exercise} code={code} />
      )}

      {!examMode && <HintsPanel exercise={exercise} code={code} />}
    </div>
  );
}

function AfterActionReport({
  report,
  xpAwarded,
  exercise,
  code,
}: {
  report: GradeReport;
  xpAwarded: number | null;
  exercise: Exercise;
  code: string;
}) {
  if (report.compileError) {
    return (
      <div role="alert" className="border-2 border-signal-danger-strong bg-bunker-900 p-4">
        <p className="font-display text-base font-semibold text-signal-danger-strong">
          Erreur d'exécution
        </p>
        <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-paper-300">
          {report.compileError}
        </pre>
      </div>
    );
  }

  const allPassed = report.passedCount === report.totalCount;
  const firstFailure = report.results.find((r) => !r.passed);

  return (
    <div className="space-y-4 border border-olive-600 bg-bunker-900 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <VerdictStamp
          passed={allPassed}
          passedCount={report.passedCount}
          totalCount={report.totalCount}
        />
        {allPassed && xpAwarded !== null && (
          <span className="font-mono text-sm text-brass-400">+{xpAwarded} XP</span>
        )}
      </div>

      <ul className="space-y-1.5 font-mono text-xs">
        {report.results.map((r) => (
          <li key={r.description} className="flex items-center gap-2">
            <span className={r.passed ? "text-signal-success-strong" : "text-signal-danger-strong"}>
              {r.passed ? "✓" : "✗"}
            </span>
            <span className="text-paper-300">{r.description}</span>
          </li>
        ))}
      </ul>

      {firstFailure && (
        <div>
          <p className="font-mono text-[11px] text-olive-400">
            Écart sur « {firstFailure.description} »
          </p>
          <div className="mt-1 overflow-hidden rounded-sm text-xs">
            <ReactDiffViewer
              oldValue={jsonOf(firstFailure.expected)}
              newValue={jsonOf(firstFailure.actual ?? firstFailure.error)}
              leftTitle="Attendu"
              rightTitle="Ta sortie"
              useDarkTheme
              splitView
            />
          </div>
          <div className="mt-3">
            <TracePanel
              code={code}
              functionName={exercise.functionName}
              args={firstFailure.args}
              caseLabel={firstFailure.description}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function jsonOf(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2) ?? String(value);
  } catch {
    return String(value);
  }
}
