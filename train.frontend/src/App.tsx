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
    { name: 'Push Day', lastPerformed: new Date(), bodyPartsUsed: ['Chest, Shoulders, Triceps, Core'] },
    { name: 'Pull Day' },
    { name: 'Leg Day' },
    { name: 'Arm Day' },
    { name: 'Bodyweight Day' },
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
        <RouterPage path={'/workouts'} pageComponent={<WorkoutsView workouts={workouts} />} />
        <RouterPage path={'/exercises'} pageComponent={<ExercisesView exercises={exercises} />} />
      </Router>
    </div>
  );
};

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps): JSX.Element => props.pageComponent;

export default App;
