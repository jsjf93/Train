import * as React from 'react';
import { useEffect, useState } from 'react';
import NavigationBar from './Nav/NavigationBar';
import { Router, RouteComponentProps } from '@reach/router';
import HomeView from './Home/Home';
import WorkoutsView from './Workouts/WorkoutsList/WorkoutsView';
import { useStore } from '../Context';
import { IWorkout, IExercise } from '../Definitions/Interfaces';
import ExercisesView from './Exercises/ExerciseList/ExercisesView';
import { useObserver } from 'mobx-react-lite';
import AddWorkout from './Workouts/AddWorkout';

const AppRouter = () => {
  const store = useStore();

  const [exercises, setExercises] = useState(store.exercises);

  useEffect(() => {
    const endpoint = process.env.REACT_APP_TRAIN_API;
    fetch(endpoint + 'GetExercises', {mode: 'cors'})
      .then(response => response.json())
      .then(result => {
        setExercises(result);
        console.log(result);
      });
  });

  return useObserver(() => (
    <div id={'app-container'}>
      <NavigationBar />

      <Router>
        <RouterPage path={'/'} pageComponent={<HomeView />} />
        <RouterPage
          path={'/workouts'}
          pageComponent={
            <WorkoutsView workouts={store.workouts} onChange={(workouts: IWorkout[]) => (store.workouts = workouts)} />
          }
        />
        <RouterPage
          path={'/exercises'}
          pageComponent={
            <ExercisesView
              exercises={exercises}
              bodyParts={store.bodyParts}
              onChange={(newExercises: IExercise[]) => setExercises(newExercises)}
            />
          }
        />
        <RouterPage path={'/addworkout'} pageComponent={<AddWorkout />} />
      </Router>
    </div>
  ));
};

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps): JSX.Element => props.pageComponent;

export default AppRouter;
