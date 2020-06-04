import { IExercise, IWorkout } from '../Definitions/Interfaces';

export function createStore() {
  return {
    exercises: [] as IExercise[],
    workouts: [] as IWorkout[],
    bodyParts: [] as string[],
    // temp function until backend is ready
    get newWorkoutId() {
      return Math.max(...this.workouts.map(w => w.id)) + 1;
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
