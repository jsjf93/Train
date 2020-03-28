import * as React from 'react';

type Props = {
  exercises: string[];
};

const ExercisesView = (props: Props): JSX.Element => {
  return (
    <>
      <h1>Exercises</h1>
      {props.exercises.map((e, i) => (
        <div key={e + i}>{e}</div>
      ))}
    </>
  );
};

export default ExercisesView;
