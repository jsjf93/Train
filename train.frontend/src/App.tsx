import React from 'react';
import './App.css';
import { Link, Router, RouteComponentProps } from '@reach/router';
import ExercisesView from './Components/Content/Exercises/ExerciseList/ExercisesView';
import WorkoutsView from './Components/Content/Workouts/WorkoutsList/WorkoutsView';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <h1>Train</h1>
      <nav>
        <Link to={'/exercises'}>Exercises</Link>
        <Link to={'/workouts'}>Workouts</Link>
      </nav>

      <Router>
        <RouterPage path={'/exercises'} pageComponent={<ExercisesView />} />
        <RouterPage path={'/workouts'} pageComponent={<WorkoutsView />} />
      </Router>
    </div>
  );
};

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps): JSX.Element => props.pageComponent;

export default App;
