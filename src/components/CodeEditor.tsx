import { python } from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

export function CodeEditor({
  value,
  onChange,
  onPaste,
  label,
  readOnly,
}: {
  value: string;
  onChange: (value: string) => void;
  onPaste: () => void;
  label: string;
  readOnly?: boolean;
}) {
  return (
    <div className="flex h-full flex-col bg-bunker-900">
      <div className="flex items-center justify-between border-b border-olive-600 px-3 py-1.5">
        <span className="font-mono text-[11px] text-olive-400">{label}</span>
      </div>
      <div
        className="min-h-0 flex-1 overflow-auto"
        onPasteCapture={onPaste}
      >
        <CodeMirror
          value={value}
          onChange={onChange}
          theme={oneDark}
          extensions={[python()]}
          basicSetup={{ tabSize: 4 }}
          height="100%"
          editable={!readOnly}
          style={{ height: "100%", fontSize: "14px" }}
          aria-label={label}
        />
      </div>
    </div>
  );
}
