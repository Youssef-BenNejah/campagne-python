import { useEffect, useRef, useState } from "react";

export type CheatFlag =
  | { kind: "paste"; at: number }
  | { kind: "tab-blur"; at: number };

/**
 * Soft, transparent cheat signals — a deterrent and a score-deduction input,
 * not real proctoring. A motivated user can defeat client-side checks; the
 * point is to make the honest path the easy one, and to be upfront about it.
 */
export function useCheatWatch(active: boolean) {
  const [flags, setFlags] = useState<CheatFlag[]>([]);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    function onVisibilityChange() {
      if (!activeRef.current) return;
      if (document.visibilityState === "hidden") {
        setFlags((prev) => [...prev, { kind: "tab-blur", at: Date.now() }]);
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  function reportPaste() {
    if (!activeRef.current) return;
    setFlags((prev) => [...prev, { kind: "paste", at: Date.now() }]);
  }

  function reset() {
    setFlags([]);
  }

  return { flags, reportPaste, reset };
}

/** Score penalty applied per flag kind — shown to the user, never hidden. */
export const CHEAT_PENALTY: Record<CheatFlag["kind"], number> = {
  paste: 15,
  "tab-blur": 5,
};
