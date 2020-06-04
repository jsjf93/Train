import * as React from 'react';
import { Link } from '@reach/router';
import './NavigationBar.css';

const NavigationBar = (): JSX.Element => {
  return (
    <div id={'navigationBar_container'}>
      <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/workouts'}>Workouts</Link>
        <Link to={'/exercises'}>Exercises</Link>
      </nav>
    </div>
  );
};

export default NavigationBar;
