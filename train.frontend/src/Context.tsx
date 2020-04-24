import React, { ReactNode } from 'react';
import { IExercise, IWorkout } from './Definitions/Interfaces';
import { TStore, createStore } from './Store/Store';
import { useLocalStore } from 'mobx-react-lite';

type Props = {
  children: ReactNode;
};

const fetchExercises = (): IExercise[] => {
  return [
    { id: 1, name: 'Pushup', bodyPartsUsed: ['Chest', 'Shoulders', 'Triceps'] },
    { id: 2, name: 'Pullup', bodyPartsUsed: ['Back', 'Biceps'] },
    { id: 3, name: 'Squat', bodyPartsUsed: ['Quadriceps'] },
  ];
};

const fetchWorkouts = (): IWorkout[] => {
  return [
    { id: 1, name: 'Push Day', lastPerformed: new Date(), bodyPartsUsed: ['Chest, Shoulders, Triceps, Core'] },
    { id: 2, name: 'Pull Day' },
    { id: 3, name: 'Leg Day' },
    { id: 4, name: 'Arm Day' },
    { id: 5, name: 'Bodyweight Day' },
  ];
};

const fetchBodyParts = (): string[] => {
  return [
    'Abs',
    'Chest',
    'Glutes',
    'Lower Back',
    'Lats',
    'Quadriceps',
    'Triceps',
    'Hamstrings',
    'Shoulders',
    'Biceps',
    'Forearms',
    'Trapezius',
    'Calves',
  ].sort();
};

const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider = ({ children }: Props) => {
  const store = useLocalStore(createStore);
  store.exercises = fetchExercises();
  store.workouts = fetchWorkouts();
  store.bodyParts = fetchBodyParts();

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return store;
};
