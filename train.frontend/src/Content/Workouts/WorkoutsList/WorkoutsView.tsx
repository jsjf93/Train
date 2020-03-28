import * as React from 'react';
import { Workout } from '../../../Interfaces/Interfaces';
import './WorkoutsView.css';
import Card from '../../../Components/Card';

type Props = {
  workouts: Workout[];
};

const WorkoutsView = (props: Props): JSX.Element => {
  const workouts = props.workouts.map((w, key) => <Card key={w.name + key} workout={w} />);

  return (
    <>
      <h1>Workouts</h1>
      <div id={'workouts-view_container'}>{workouts}</div>
    </>
  );
};

export default WorkoutsView;
