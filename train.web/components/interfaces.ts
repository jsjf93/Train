import { ExerciseType } from "./enums";

export interface IDictionary<T> {
  [key: string]: T;
}

export interface IExercise {
  exerciseId: number;
  exerciseName: string;
  bodyPartsUsed: IBodyPart[];
}

export interface IBodyPart {
  bodyPartId?: number;
  bodyPartName: string;
}

export interface IWorkout {
  id: number;
  workoutName: string;
  workoutExercises: IWorkoutExercise[];
}

export interface IWorkoutExercise extends IExercise {
  workoutExerciseId?: number;
  reactKey?: string;
  exerciseType?: ExerciseType;
  sets?: IDurationSet[] | IIntervalSet[] | IStrengthSet[];
}

// exerciseType added here in addition to the workoutExercise for using EF Core's Table-Per-Hierarchy approach
// in the backend
export interface IExerciseSet {
  exerciseSetId?: number;
  reactKey?: string;
  exerciseType?: ExerciseType;
  orderId: number;
}

export interface IDurationSet extends IExerciseSet {
  duration?: IDuration;
}

export interface IIntervalSet extends IExerciseSet {
  weight?: number;
  exerciseDuration?: IDuration;
  restDuration?: IDuration;
}

export interface IStrengthSet extends IExerciseSet {
  reps?: number;
  weight?: number;
  restDuration?: IDuration;
}

export interface IDuration {
  minutes?: number;
  seconds?: number;
}