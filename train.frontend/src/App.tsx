import React, { useEffect, useState } from 'react';
import './App.css';
import { Router, RouteComponentProps } from '@reach/router';
import ExercisesView from './Content/Exercises/ExerciseList/ExercisesView';
import WorkoutsView from './Content/Workouts/WorkoutsList/WorkoutsView';
import NavigationBar from './Content/Nav/NavigationBar';
import HomeView from './Content/Home/Home';
import { Workout } from './Interfaces/Interfaces';

const fetchExercises = (): string[] => {
  return ['Pushup', 'Pullup', 'Squat'];
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

const App = (): JSX.Element => {
  const initialExercises: string[] = [];
  const initialWorkouts: Workout[] = [];
  const [exercises, setExercises] = useState(initialExercises);
  const [workouts, setWorkouts] = useState(initialWorkouts);

  useEffect(() => setExercises(fetchExercises()), []);
  useEffect(() => setWorkouts(fetchWorkouts()), []);

  return (
    <div className="App">
      <NavigationBar />

      <Router>
        <RouterPage path={'/'} pageComponent={<HomeView />} />
        <RouterPage
          path={'/workouts'}
          pageComponent={
            <WorkoutsView workouts={workouts} onChange={(workouts: Workout[]): void => setWorkouts(workouts)} />
          }
        />
        <RouterPage path={'/exercises'} pageComponent={<ExercisesView exercises={exercises} />} />
      </Router>
    </div>
  );
};

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps): JSX.Element => props.pageComponent;

export default App;
