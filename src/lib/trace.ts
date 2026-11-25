import { getPyodide } from "./pyodide";

export interface TraceStep {
  line: number;
  source: string;
  locals: Record<string, unknown>;
}

export interface TraceResult {
  steps: TraceStep[];
  result: unknown;
  error: string | null;
  truncated: boolean;
}

interface PyNamespace {
  get: (name: string) => unknown;
  set: (name: string, value: unknown) => void;
  destroy: () => void;
}

const MAX_STEPS = 200;

/**
 * Runs the student's own function under sys.settrace and records the local
 * variables at every executed line — the in-browser version of the
 * "traçage pas à pas" the course material already teaches with on paper.
 * Isolated namespace, same reasoning as grade.ts: never share globals with
 * another exercise's reference solution.
 */
export async function traceFunction(
  code: string,
  functionName: string,
  args: unknown[],
): Promise<TraceResult> {
  const pyodide = await getPyodide();
  const ns = pyodide.runPython("{}") as PyNamespace;

  try {
    try {
      pyodide.runPython(code, { globals: ns });
    } catch (err) {
      return {
        steps: [],
        result: null,
        error: err instanceof Error ? err.message : String(err),
        truncated: false,
      };
    }

    if (ns.get(functionName) === undefined) {
      return {
        steps: [],
        result: null,
        error: `La fonction "${functionName}" n'a pas été trouvée.`,
        truncated: false,
      };
    }

    ns.set("__args_json", JSON.stringify(args));
    ns.set("__target_name", functionName);
    ns.set("__max_steps", MAX_STEPS);

    const resultJson = pyodide.runPython(
      `
import sys, json

def __safe(v):
    try:
        json.dumps(v)
        return v
    except Exception:
        return repr(v)

__steps = []
__truncated = [False]

def __tracer(frame, event, arg):
    if event == "line" and frame.f_code.co_name == __target_name:
        if len(__steps) >= __max_steps:
            __truncated[0] = True
            sys.settrace(None)
            return None
        snapshot = {
            k: __safe(v)
            for k, v in frame.f_locals.items()
            if not k.startswith("__")
        }
        __steps.append({"line": frame.f_lineno, "locals": snapshot})
    return __tracer

__error = None
__result = None
__args = json.loads(__args_json)
sys.settrace(__tracer)
try:
    __result = globals()[__target_name](*__args)
except Exception as e:
    __error = str(e)
finally:
    sys.settrace(None)

json.dumps({
    "steps": __steps,
    "result": __safe(__result),
    "error": __error,
    "truncated": __truncated[0],
})
`,
      { globals: ns },
    ) as string;

    const parsed = JSON.parse(resultJson) as {
      steps: { line: number; locals: Record<string, unknown> }[];
      result: unknown;
      error: string | null;
      truncated: boolean;
    };

    const sourceLines = code.split("\n");
    const steps: TraceStep[] = parsed.steps.map((step) => ({
      line: step.line,
      source: sourceLines[step.line - 1]?.trim() ?? "",
      locals: step.locals,
    }));

    return { steps, result: parsed.result, error: parsed.error, truncated: parsed.truncated };
  } finally {
    ns.destroy();
  }
}
