export interface IExercise {
    id?: number;
    name: string;
    exerciseType: number;
    exerciseDuration?: string;
    restDuration?: string;
    reps?: number;
    sets?: number;
}

export interface IWorkout {
    id: number;
    workoutName: string;
    exercises: IExercise[];
}

export interface IDuration {
    hours?: number;
    minutes?: number;
    seconds?: number;
}

// order of exercise types is the same as Workouts.Api ExerciseType definition
export enum ExerciseType {
    Duration, 
    Interval, 
    Strength
}
