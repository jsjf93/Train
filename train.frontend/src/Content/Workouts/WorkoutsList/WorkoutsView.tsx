import * as React from 'react';
import { Workout } from '../../../Interfaces/Interfaces';
import './WorkoutsView.css';
import Card from '../../../Components/Card';
import { Add } from '@material-ui/icons';
import { useState } from 'react';
import AddWorkoutModal from '../../../Components/Modals/AddWorkoutModal';

type Props = {
  workouts: Workout[];
  onChange: (workouts: Workout[]) => void;
};

const WorkoutsView = (props: Props): JSX.Element => {
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(true);

  const onAddWorkout = (workout: Workout): void => props.onChange(props.workouts.concat(workout));
  const onDeleteWorkout = (id: number): void => props.onChange(props.workouts.filter(w => w.id !== id));
  const onEditWorkout = (workout: Workout): void =>
    props.onChange(props.workouts.map(w => (w.id === workout.id ? workout : w)));

  const workouts = props.workouts.map((w, key) => (
    <Card
      key={w.name + key}
      workout={w}
      onAddWorkout={onAddWorkout}
      onDeleteWorkout={onDeleteWorkout}
      onEditWorkout={onEditWorkout}
    />
  ));

  workouts.push(
    <div key={'add-workout-key'} className={'card_container'} onClick={(): void => setShowAddWorkoutModal(true)}>
      <div id={'card_add-container'}>
        <Add />
      </div>
    </div>,
  );

  return (
    <>
      {showAddWorkoutModal && <AddWorkoutModal newWorkoutId={Math.max(...props.workouts.map(w => w.id)) + 1} />}
      <h1>Workouts</h1>
      <div id={'workouts-view_container'}>{workouts}</div>
    </>
  );
};

export default WorkoutsView;
