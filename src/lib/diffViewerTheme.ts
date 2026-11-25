/**
 * react-diff-viewer-continued's own dark theme uses a generic
 * blue/red/green palette that clashes with the bunker/paper/brass system.
 * These hex values are duplicated from src/index.css on purpose — the
 * library takes a plain style object, not CSS variables.
 */
export const diffViewerStyles = {
  variables: {
    dark: {
      diffViewerBackground: "#181f14",
      diffViewerColor: "#e8e1cf",
      addedBackground: "rgba(143, 184, 125, 0.15)",
      addedColor: "#e8e1cf",
      removedBackground: "rgba(210, 105, 79, 0.15)",
      removedColor: "#e8e1cf",
      wordAddedBackground: "rgba(143, 184, 125, 0.35)",
      wordRemovedBackground: "rgba(210, 105, 79, 0.35)",
      addedGutterBackground: "rgba(143, 184, 125, 0.08)",
      removedGutterBackground: "rgba(210, 105, 79, 0.08)",
      gutterBackground: "#12170f",
      gutterBackgroundDark: "#12170f",
      highlightBackground: "rgba(184, 134, 59, 0.08)",
      highlightGutterBackground: "rgba(184, 134, 59, 0.15)",
      codeFoldGutterBackground: "#3a4a37",
      codeFoldBackground: "#202a1b",
      emptyLineBackground: "#181f14",
      gutterColor: "#6b7a5e",
      addedGutterColor: "#e8e1cf",
      removedGutterColor: "#e8e1cf",
      codeFoldContentColor: "#6b7a5e",
      diffViewerTitleBackground: "#202a1b",
      diffViewerTitleColor: "#f1ead4",
      diffViewerTitleBorderColor: "#3a4a37",
    },
  },
};
