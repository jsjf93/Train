import React from 'react';
import './App.css';
import { Router, RouteComponentProps } from '@reach/router';
import ExercisesView from './Content/Exercises/ExerciseList/ExercisesView';
import WorkoutsView from './Content/Workouts/WorkoutsList/WorkoutsView';
import NavigationBar from './Content/Nav/NavigationBar';
import HomeView from './Content/Home/Home';
import { Workout } from './Interfaces/Interfaces';
import { observer } from 'mobx-react-lite';
import { useStore } from '.';

const App = observer(() => {
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
        <RouterPage path={'/exercises'} pageComponent={<ExercisesView exercises={store.exercises} />} />
      </Router>
    </div>
  );
});

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps): JSX.Element => props.pageComponent;

export default App;
