import * as React from 'react';
import NavigationBar from './Nav/NavigationBar';
import { Router, RouteComponentProps } from '@reach/router';
import HomeView from './Home/Home';
import WorkoutsView from './Workouts/WorkoutsList/WorkoutsView';
import { useStore } from '../Context';
import { Workout, Exercise } from '../Interfaces/Interfaces';
import ExercisesView from './Exercises/ExerciseList/ExercisesView';

const AppRouter = () => {
  const store = useStore();

  return (
    <div id={'app-container'}>
      <NavigationBar />

      <Router>
        <RouterPage path={'/'} pageComponent={<HomeView />} />
        <RouterPage
          path={'/workouts'}
          pageComponent={
            <WorkoutsView
              workouts={store.workouts}
              onChange={(workouts: Workout[]): void => store.setWorkouts(workouts)}
            />
          }
        />
        <RouterPage
          path={'/exercises'}
          pageComponent={
            <ExercisesView
              exercises={store.exercises}
              bodyParts={store.bodyParts}
              onChange={(exercises: Exercise[]) => (store.exercises = exercises)}
            />
          }
        />
      </Router>
    </div>
  );
};

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps): JSX.Element => props.pageComponent;

export default AppRouter;
