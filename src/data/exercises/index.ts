import { analyseModulaireExercises } from "./analyseModulaire";
import { approximationExercises } from "./approximation";
import { calculArithmetiqueExercises } from "./calculArithmetique";
import { enregistrementsExercises } from "./enregistrements";
import { enregistrementsSerieExercises } from "./enregistrementsSerie";
import { optimisationExercises } from "./optimisation";
import { proprietesNumeriquesExercises } from "./proprietesNumeriques";
import { rechercheExercises } from "./recherche";
import { tableaux2dExercises } from "./tableaux2d";
import { triExercises } from "./tri";
import type { Exercise } from "./types";

export type { Exercise, TestCase } from "./types";
export { buildTestCases } from "./types";

export const exercisesByTopic: Record<string, Exercise[]> = {
  tri: triExercises,
  recherche: rechercheExercises,
  "calcul-arithmetique": calculArithmetiqueExercises,
  enregistrements: enregistrementsExercises,
  "analyse-modulaire": analyseModulaireExercises,
  optimisation: optimisationExercises,
  approximation: approximationExercises,
  "tableaux-2d": tableaux2dExercises,
  "proprietes-numeriques": proprietesNumeriquesExercises,
  "enregistrements-serie": enregistrementsSerieExercises,
};

export function getExercisesForTopic(topicId: string): Exercise[] {
  return exercisesByTopic[topicId] ?? [];
}

export function getExercise(topicId: string, exerciseId: string): Exercise | undefined {
  return getExercisesForTopic(topicId).find((exercise) => exercise.id === exerciseId);
}
