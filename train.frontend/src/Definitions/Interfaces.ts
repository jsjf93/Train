export interface Workout {
  id: number;
  name: string;
  lastPerformed?: Date;
  bodyPartsUsed?: string[];
}

export interface Exercise {
  id: number;
  name: string;
  bodyPartsUsed: string[];
}

export interface WorkoutExercise extends Exercise {
  exerciseType: string;
  exerciseData: DurationData | IntervalData | StrengthData;
}

export interface DurationData {

}

export interface IntervalData {

}

export interface StrengthData {
  sets: StrengthSet[];
}

export interface DurationSet {
  id: number;
  duration: IDuration;
}

export interface StrengthSet {
  id: number;
  reps: number;
  weight?: number;
  restDuration?: IDuration;
}

export interface IDuration {
  hours?: number;
  minutes?: number;
  seconds?: number;
}