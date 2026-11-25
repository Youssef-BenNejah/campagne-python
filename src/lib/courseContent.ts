// Course pages render the knowledge base markdown directly — no duplication,
// no CMS, just the same files the exercises were adapted from.
const modules = import.meta.glob("../../base_connaissance/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const byFilename = new Map<string, string>();
for (const [path, content] of Object.entries(modules)) {
  byFilename.set(path.split("/").pop()!, content);
}

export function getCourseContent(sourceFilename: string): string | null {
  return byFilename.get(sourceFilename) ?? null;
}
