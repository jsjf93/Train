import React, { Component } from 'react';
import './App.css';

import WorkoutLibraryView from './components/WorkoutLibraryView';

class App extends Component {
  public render() {
    return (
      <div className='App'>
        <div className='app-content'>
          <h3>Workouts</h3>
          <WorkoutLibraryView />
        </div>
      </div>
    );
  }
}

export default App;
