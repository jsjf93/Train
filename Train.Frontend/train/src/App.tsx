import React, { Component } from 'react';
import './App.css';

import ExerciseLibraryView from './components/ExerciseLibraryView';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <h3>Exercises</h3>
        <ExerciseLibraryView />
      </div>
    );
  }
}

export default App;
