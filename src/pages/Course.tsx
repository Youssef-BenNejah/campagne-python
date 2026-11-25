import ReactMarkdown from "react-markdown";
import { Link, Navigate, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { topics } from "../data/topics";
import { getCourseContent } from "../lib/courseContent";

export function Course() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  const content = getCourseContent(topic.source);

  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <Link
        to={`/secteur/${topic.id}`}
        className="font-mono text-xs text-olive-400 hover:text-paper-200"
      >
        ← secteur « {topic.name} »
      </Link>

      <div className="mt-4 bg-paper-200 px-6 py-6 text-paper-ink">
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: (props) => <h1 className="font-display text-2xl font-semibold" {...props} />,
              h2: (props) => (
                <h2 className="mt-6 font-display text-xl font-semibold" {...props} />
              ),
              h3: (props) => <h3 className="mt-4 font-display text-lg font-medium" {...props} />,
              p: (props) => <p className="mt-3 text-[15px] leading-relaxed" {...props} />,
              ul: (props) => <ul className="mt-2 list-inside list-disc space-y-1" {...props} />,
              ol: (props) => <ol className="mt-2 list-inside list-decimal space-y-1" {...props} />,
              table: (props) => (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse text-sm" {...props} />
                </div>
              ),
              th: (props) => (
                <th className="border border-paper-300 px-2 py-1 text-left" {...props} />
              ),
              td: (props) => <td className="border border-paper-300 px-2 py-1" {...props} />,
              pre: (props) => (
                <pre
                  className="mt-3 overflow-x-auto bg-bunker-950 p-3 font-mono text-xs text-paper-200"
                  {...props}
                />
              ),
              code: (props) => <code className="font-mono text-[13px]" {...props} />,
              blockquote: (props) => (
                <blockquote
                  className="mt-3 border-l-2 border-olive-500 pl-3 italic text-paper-ink/70"
                  {...props}
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <p role="alert" className="text-sm text-signal-danger-strong">
            Contenu de cours introuvable pour « {topic.source} ».
          </p>
        )}
      </div>
    </div>
  );
}
