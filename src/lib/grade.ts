import { buildTestCases, type Exercise, type TestCase } from "../data/exercises/types";
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
 * just pass/fail. Test cases are rebuilt (fixed + freshly randomized) on
 * every call, so retrying a battle never grades against the same numbers.
 */
export async function gradeSubmission(
  exercise: Exercise,
  studentCode: string,
): Promise<GradeReport> {
  const pyodide = await getPyodide();
  const testCases = buildTestCases(exercise);

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
    return { results: [], passedCount: 0, totalCount: testCases.length, compileError };
  }

  const studentFn = pyodide.globals.get(exercise.functionName);
  if (typeof studentFn !== "function" && !isPyCallable(studentFn)) {
    return {
      results: [],
      passedCount: 0,
      totalCount: testCases.length,
      compileError: `La fonction "${exercise.functionName}" n'a pas été trouvée. Vérifie son nom.`,
    };
  }

  const results: TestResult[] = [];
  for (const testCase of testCases) {
    results.push(await runOneCase(pyodide, testCase, studentFn, exercise.tolerance));
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
  tolerance: number | undefined,
): Promise<TestResult> {
  // Plain JS objects (e.g. {"nom": ..., "score": ...}) come through as an
  // opaque proxy via globals.set, not a Python dict — j1["score"] would raise
  // "not subscriptable". Routing args through JSON gives real dicts/lists on
  // the Python side for any JSON-safe argument shape.
  pyodide.globals.set("__args_json", JSON.stringify(testCase.args));
  pyodide.runPython("import json as __json\n__args = __json.loads(__args_json)");
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

  const passed = error === null && deepEqual(actual, expected, tolerance ?? 1e-9);

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

function deepEqual(a: unknown, b: unknown, tolerance: number): boolean {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => deepEqual(v, b[i], tolerance));
  }
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < tolerance;
  }
  return false;
}
