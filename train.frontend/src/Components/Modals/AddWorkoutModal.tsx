import * as React from 'react';
import './AddWorkoutModal.css';
import { useState } from 'react';
import { Workout } from '../../Interfaces/Interfaces';

type Props = {
  newWorkoutId: number;
};

const AddWorkoutModal = (props: Props): JSX.Element => {
  const initialWorkout: Workout = { id: props.newWorkoutId, name: '' };
  const [newWorkout, setCurrentWorkout] = useState(initialWorkout);

  return (
    <div className={'modal_overlay'}>
      <div className={'addWorkoutModal_container'}>
        <div className={'addWorkoutModal_header'}>
          <strong className={'addWorkoutModal_title'}>New Workout</strong>
        </div>
        <hr />
        <div id={'addWorkoutModal_addExerciseButton'}>
          <strong> Add Exercise</strong>
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutModal;
