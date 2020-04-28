export interface IWorkout {
  id: number;
  name: string;
  lastPerformed?: Date;
  bodyPartsUsed?: string[];
  exercises?: IWorkoutExercise[];
}

export interface IExercise {
  id: number;
  name: string;
  bodyPartsUsed: string[];
}

export interface IWorkoutExercise extends IExercise {
  exerciseType?: string;
  exerciseData: IDurationData | IIntervalData | IStrengthData;
}

export interface IDurationData {
  sets: IDurationSet;
}

export interface IIntervalData {
  sets: IIntervalSet[];
}

export interface IStrengthData {
  sets: IStrengthSet[];
}

export interface IDurationSet {
  id: number;
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
  hours?: number;
  minutes?: number;
  seconds?: number;
}