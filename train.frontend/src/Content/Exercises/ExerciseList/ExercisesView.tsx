import * as React from 'react';
import { Container } from '@material-ui/core';
import { Exercise } from '../../../Interfaces/Interfaces';

type Props = {
  exercises: Exercise[];
  onChange: (exercises: Exercise[]) => void;
};

const ExercisesView = (props: Props): JSX.Element => {
  return (
    <Container>
      {props.exercises.map(e => (
        <div key={e.id}>{e}</div>
      ))}
    </Container>
  );
};

export default ExercisesView;
