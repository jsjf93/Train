import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { TStore, createStore } from './Store/Store';
import { useLocalStore } from 'mobx-react-lite';
import { Exercise, Workout } from './Interfaces/Interfaces';

type Props = {
  children: ReactNode;
};

const fetchExercises = (): Exercise[] => {
  return [
    { id: 1, name: 'Pushup', bodyPartsUsed: ['Chest', 'Shoulders', 'Triceps'] },
    { id: 2, name: 'Pullup', bodyPartsUsed: ['Back', 'Biceps'] },
    { id: 3, name: 'Squat', bodyPartsUsed: ['Quadriceps'] },
  ];
};

const fetchWorkouts = (): Workout[] => {
  return [
    { id: 1, name: 'Push Day', lastPerformed: new Date(), bodyPartsUsed: ['Chest, Shoulders, Triceps, Core'] },
    { id: 2, name: 'Pull Day' },
    { id: 3, name: 'Leg Day' },
    { id: 4, name: 'Arm Day' },
    { id: 5, name: 'Bodyweight Day' },
  ];
};

const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider = ({ children }: Props) => {
  const store = useLocalStore(createStore);
  store.exercises = fetchExercises();
  store.workouts = fetchWorkouts();

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return store;
};

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
