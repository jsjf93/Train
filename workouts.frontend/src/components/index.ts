export interface IExercise {
    id?: number;
    name: string;
    exerciseType: number;
    exerciseDuration?: Date;
    restDuration?: Date;
    reps?: number;
    sets?: number;
}

export interface IWorkout {
    id: number;
    workoutName: string;
    exercises: IExercise[];
}

// order of exercise types is the same as Workouts.Api ExerciseType definition
export enum ExerciseType {
    Duration, 
    Interval, 
    Strength
}
