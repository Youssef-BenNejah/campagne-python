export function VerdictStamp({ passed, passedCount, totalCount }: { passed: boolean; passedCount: number; totalCount: number }) {
  return (
    <div
      role="status"
      className={
        "flex items-center gap-3 border-2 px-4 py-2.5 font-display text-base font-semibold tracking-wide " +
        (passed
          ? "border-signal-success-strong text-signal-success-strong"
          : "border-signal-danger-strong text-signal-danger-strong")
      }
    >
      <span>{passed ? "Mission réussie" : "Mission échouée"}</span>
      <span className="font-mono text-xs font-normal opacity-80">
        {passedCount}/{totalCount} tests
      </span>
    </div>
  );
}
