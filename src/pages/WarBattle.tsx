import { Navigate, useParams } from "react-router-dom";
import { ChallengeScreen } from "../components/ChallengeScreen";
import { getWar, isWarUnlocked } from "../data/wars";
import { useProgress } from "../lib/useProgress";

export function WarBattle() {
  const { warId } = useParams<{ warId: string }>();
  const war = warId ? getWar(warId) : undefined;
  const { clearedByTopic, loading } = useProgress();

  if (!war) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <p role="status" aria-busy="true" className="px-5 py-16 text-center font-mono text-sm text-olive-400">
        Chargement…
      </p>
    );
  }

  if (!isWarUnlocked(war, clearedByTopic)) {
    return <Navigate to="/" replace />;
  }

  return (
    <ChallengeScreen
      exercise={war}
      backTo="/"
      backLabel="carte de campagne"
      submissionTopicId={war.topicId}
    />
  );
}
