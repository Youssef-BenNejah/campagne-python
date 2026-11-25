import { buildTestCases, type Exercise, type TestCase } from "../data/exercises/types";
import { getPyodide, type PyodideInterface } from "./pyodide";

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

interface PyNamespace {
  get: (name: string) => unknown;
  set: (name: string, value: unknown) => void;
  destroy: () => void;
}

/**
 * Runs the student's function and the reference solution against every test
 * case, each in its OWN Python namespace, then diffs the two outputs value
 * by value. Separate namespaces matter: several reference solutions define
 * helper functions (pgcd, est_premier, somme_diviseurs...) — sharing one
 * global namespace would let a student's code "pass" by silently reusing a
 * helper the reference left behind instead of writing its own. Test cases
 * are rebuilt (fixed + freshly randomized) on every call, so retrying a
 * battle never grades against the same numbers.
 */
export async function gradeSubmission(
  exercise: Exercise,
  studentCode: string,
): Promise<GradeReport> {
  const pyodide = await getPyodide();
  const testCases = buildTestCases(exercise);

  const referenceNs = pyodide.runPython("{}") as PyNamespace;
  const studentNs = pyodide.runPython("{}") as PyNamespace;

  try {
    pyodide.runPython(exercise.referenceSolution, { globals: referenceNs });

    let compileError: string | null = null;
    try {
      pyodide.runPython(studentCode, { globals: studentNs });
    } catch (err) {
      compileError = err instanceof Error ? err.message : String(err);
      return { results: [], passedCount: 0, totalCount: testCases.length, compileError };
    }

    if (studentNs.get(exercise.functionName) === undefined) {
      return {
        results: [],
        passedCount: 0,
        totalCount: testCases.length,
        compileError: `La fonction "${exercise.functionName}" n'a pas été trouvée. Vérifie son nom.`,
      };
    }

    const results: TestResult[] = [];
    for (const testCase of testCases) {
      results.push(
        await runOneCase(pyodide, exercise, testCase, referenceNs, studentNs),
      );
    }

    return {
      results,
      passedCount: results.filter((r) => r.passed).length,
      totalCount: results.length,
      compileError: null,
    };
  } finally {
    referenceNs.destroy();
    studentNs.destroy();
  }
}

async function runOneCase(
  pyodide: PyodideInterface,
  exercise: Exercise,
  testCase: TestCase,
  referenceNs: PyNamespace,
  studentNs: PyNamespace,
): Promise<TestResult> {
  const tolerance = exercise.tolerance ?? 1e-9;
  const argsJson = JSON.stringify(testCase.args);

  let expected: unknown;
  let actual: unknown;
  let error: string | null = null;

  try {
    expected = toJs(callInNamespace(pyodide, referenceNs, exercise.functionName, argsJson));
  } catch (err) {
    expected = null;
    error = `Référence invalide : ${err instanceof Error ? err.message : String(err)}`;
  }

  try {
    actual = toJs(callInNamespace(pyodide, studentNs, exercise.functionName, argsJson));
  } catch (err) {
    actual = null;
    error = err instanceof Error ? err.message : String(err);
  }

  const passed = error === null && deepEqual(actual, expected, tolerance);

  return {
    description: testCase.description,
    args: testCase.args,
    expected,
    actual,
    error,
    passed,
  };
}

/**
 * Calls `functionName(*json.loads(argsJson))` inside the given namespace.
 * Routing args through JSON (instead of pyodide.globals.set) matters: a
 * plain JS object passed that way becomes an opaque proxy, not a Python
 * dict, so any record-style exercise would fail with "not subscriptable".
 */
function callInNamespace(
  pyodide: PyodideInterface,
  namespace: PyNamespace,
  functionName: string,
  argsJson: string,
): unknown {
  namespace.set("__args_json", argsJson);
  return pyodide.runPython(
    `import json as __json\n__result = ${functionName}(*__json.loads(__args_json))\n__result`,
    { globals: namespace },
  );
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
