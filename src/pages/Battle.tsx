import { Navigate, useParams } from "react-router-dom";
import { ChallengeScreen } from "../components/ChallengeScreen";
import { getExercise } from "../data/exercises";
import { topics } from "../data/topics";

export function Battle() {
  const { topicId, exerciseId } = useParams<{ topicId: string; exerciseId: string }>();
  const topic = topics.find((t) => t.id === topicId);
  const exercise = topicId && exerciseId ? getExercise(topicId, exerciseId) : undefined;

  if (!topic || !exercise) {
    return <Navigate to="/" replace />;
  }

  return (
    <ChallengeScreen
      exercise={exercise}
      backTo={`/secteur/${topic.id}`}
      backLabel={`secteur « ${topic.name} »`}
      submissionTopicId={exercise.topicId}
    />
  );
}
