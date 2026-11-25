import type { Exercise, TestCase } from "../data/sampleExercise";
import { getPyodide } from "./pyodide";

export interface TestResult {
  description: string;
  args: unknown[];
  expected: unknown;
  actual: unknown;
  error: string | null;
  passed: boolean;
}

export interface GradeReport {
  results: TestResult[];
  passedCount: number;
  totalCount: number;
  compileError: string | null;
}

/**
 * Runs the student's function and the reference solution against every test
 * case inside the same Pyodide runtime, then diffs the two outputs value by
 * value. This is what makes the feedback "where you're wrong" rather than
 * just pass/fail.
 */
export async function gradeSubmission(
  exercise: Exercise,
  studentCode: string,
): Promise<GradeReport> {
  const pyodide = await getPyodide();

  // Load the reference once; it never changes between submissions.
  pyodide.runPython(exercise.referenceSolution);
  pyodide.globals.set(
    "__reference_fn",
    pyodide.globals.get(exercise.functionName),
  );

  let compileError: string | null = null;
  try {
    pyodide.runPython(studentCode);
  } catch (err) {
    compileError = err instanceof Error ? err.message : String(err);
    return { results: [], passedCount: 0, totalCount: exercise.testCases.length, compileError };
  }

  const studentFn = pyodide.globals.get(exercise.functionName);
  if (typeof studentFn !== "function" && !isPyCallable(studentFn)) {
    return {
      results: [],
      passedCount: 0,
      totalCount: exercise.testCases.length,
      compileError: `La fonction "${exercise.functionName}" n'a pas été trouvée. Vérifie son nom.`,
    };
  }

  const results: TestResult[] = [];
  for (const testCase of exercise.testCases) {
    results.push(await runOneCase(pyodide, testCase, studentFn));
  }

  return {
    results,
    passedCount: results.filter((r) => r.passed).length,
    totalCount: results.length,
    compileError: null,
  };
}

interface Callable {
  (...args: unknown[]): unknown;
}

function isPyCallable(value: unknown): value is Callable {
  return typeof value === "function";
}

async function runOneCase(
  pyodide: Awaited<ReturnType<typeof getPyodide>>,
  testCase: TestCase,
  studentFn: unknown,
): Promise<TestResult> {
  pyodide.globals.set("__args", testCase.args);
  let expected: unknown;
  let actual: unknown;
  let error: string | null = null;

  try {
    expected = toJs(
      pyodide.runPython(`__reference_fn(*__args)`),
    );
  } catch (err) {
    expected = null;
    error = `Référence invalide : ${err instanceof Error ? err.message : String(err)}`;
  }

  try {
    pyodide.globals.set("__student_fn", studentFn);
    actual = toJs(pyodide.runPython(`__student_fn(*__args)`));
  } catch (err) {
    actual = null;
    error = err instanceof Error ? err.message : String(err);
  }

  const passed = error === null && deepEqual(actual, expected);

  return {
    description: testCase.description,
    args: testCase.args,
    expected,
    actual,
    error,
    passed,
  };
}

function toJs(value: unknown): unknown {
  if (value && typeof (value as { toJs?: unknown }).toJs === "function") {
    return (value as { toJs: () => unknown }).toJs();
  }
  return value;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
  }
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < 1e-9;
  }
  return false;
}

// Re-exported for the exercise id it was defined against; keeps grade.ts
// decoupled from any single exercise shape while the bank is still a stub.
export type { Exercise };
