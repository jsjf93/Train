import { Exercise, Workout } from '../Interfaces/Interfaces';

export function createStore() {
  return {
    exercises: [] as Exercise[],
    workouts: [] as Workout[],
    bodyParts: [] as string[],
    setWorkouts(workouts: Workout[]) {
      this.workouts = workouts;
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
