import React, { Component } from 'react';
import './App.css';

import ExerciseLibraryView from './components/ExerciseLibraryView';

class App extends Component {
  public render() {
    return (
      <div className='App'>
        <div className='app-content'>
          <div className='exercise-library-container'>
            <h3>Exercises</h3>
            <ExerciseLibraryView />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
