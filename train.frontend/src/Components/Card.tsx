import * as React from 'react';
import './Card.css';
import { Workout } from '../Interfaces/Interfaces';
import moment from 'moment';
import { MoreVert } from '@material-ui/icons';

type Props = {
  workout: Workout;
};

const Card = (props: Props): JSX.Element => {
  const lastPerformed = props.workout.lastPerformed ? moment(props.workout.lastPerformed).format('DD/MM/YY') : 'never';

  return (
    <div className={'card_container'}>
      <div className={'card_more-options'}>
        <MoreVert />
      </div>
      <h4>{props.workout.name}</h4>
      <div>
        Last performed: <span>{lastPerformed}</span>
      </div>
      <div className={'card_start-workout'}>Start</div>
    </div>
  );
};

export default Card;
