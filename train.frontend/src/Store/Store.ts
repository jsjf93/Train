import { Exercise, Workout } from '../Interfaces/Interfaces';

export function createStore() {
  return {
    exercises: [] as Exercise[],
    workouts: [] as Workout[],
    setExercises(exercises: Exercise[]) {
      this.exercises = exercises;
    },
    setWorkouts(workouts: Workout[]) {
      this.workouts = workouts;
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
