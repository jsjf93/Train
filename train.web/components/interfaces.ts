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
  exerciseType?: string;
  sets?: IDurationSet | IIntervalSet | IStrengthSet;
}

export interface IDurationSet {
  durationSetId: number;
  duration: IDuration;
}

export interface IIntervalSet {
  id: number;
  weight?: number;
  exerciseDuration?: IDuration;
  restDuration?: IDuration;
}

export interface IStrengthSet {
  id: number;
  reps?: number;
  weight?: number;
  restDuration?: IDuration;
}

export interface IDuration {
  minutes?: number;
  seconds?: number;
}