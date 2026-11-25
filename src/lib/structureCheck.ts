import { getPyodide } from "./pyodide";

interface PyNamespace {
  get: (name: string) => unknown;
  set: (name: string, value: unknown) => void;
  destroy: () => void;
}

/**
 * Static check only — never executes the student's code. Used to power the
 * "as-tu pensé à une boucle ?" nudge without running anything untrusted.
 */
export async function hasLoopOrComprehension(code: string): Promise<boolean> {
  const pyodide = await getPyodide();
  const ns = pyodide.runPython("{}") as PyNamespace;
  try {
    ns.set("__code", code);
    const result = pyodide.runPython(
      `
import ast
try:
    __tree = ast.parse(__code)
    __has_loop = any(
        isinstance(n, (ast.For, ast.While, ast.comprehension))
        for n in ast.walk(__tree)
    )
except SyntaxError:
    __has_loop = True
__has_loop
`,
      { globals: ns },
    );
    return Boolean(result);
  } finally {
    ns.destroy();
  }
}
