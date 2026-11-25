// Pyodide is loaded from the CDN at runtime (not bundled) — this is the
// documented, reliable way to use it from a Vite app without fighting the
// bundler over its wasm/worker assets. Zero backend, zero per-run cost.
const PYODIDE_VERSION = "0.26.4";
const PYODIDE_CDN_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

export interface PyodideInterface {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: {
    get: (name: string) => unknown;
    set: (name: string, value: unknown) => void;
  };
  setStdout: (options: { batched: (msg: string) => void }) => void;
  setStderr: (options: { batched: (msg: string) => void }) => void;
}

let scriptLoadPromise: Promise<void> | null = null;
let pyodidePromise: Promise<PyodideInterface> | null = null;

function loadScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;
  scriptLoadPromise = new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `${PYODIDE_CDN_BASE}pyodide.js`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Impossible de charger Pyodide depuis le CDN."));
    document.head.appendChild(script);
  });
  return scriptLoadPromise;
}

/** Returns a shared, lazily-initialized Pyodide runtime. */
export function getPyodide(): Promise<PyodideInterface> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = loadScript().then(() => {
    if (!window.loadPyodide) {
      throw new Error("Pyodide ne s'est pas initialisé correctement.");
    }
    return window.loadPyodide({ indexURL: PYODIDE_CDN_BASE });
  });
  return pyodidePromise;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  error: string | null;
}

/** Runs arbitrary student code and captures stdout/stderr, never throwing. */
export async function runPython(code: string): Promise<RunResult> {
  const pyodide = await getPyodide();
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];

  pyodide.setStdout({ batched: (msg) => stdoutLines.push(msg) });
  pyodide.setStderr({ batched: (msg) => stderrLines.push(msg) });

  let error: string | null = null;
  try {
    await pyodide.runPythonAsync(code);
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  return {
    stdout: stdoutLines.join("\n"),
    stderr: stderrLines.join("\n"),
    error,
  };
}
