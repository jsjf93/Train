import * as React from 'react';
import { useState } from 'react';
import { Container, makeStyles, createStyles, Paper, InputBase, ButtonGroup, Button } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    inputContainer: {
      padding: '0px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 300,
      margin: '20px 0',
    },
    input: {
      flex: 1,
    },
  }),
);

const AddWorkout = () => {
  const classes = useStyles();

  const [workoutName, setWorkoutName] = useState('');
  console.log(workoutName);

  return (
    <Container className={classes.root} maxWidth="sm" data-testid="outerContainer">
      <h1>New Workout</h1>
      <Paper component="form" aria-label="menu" className={classes.inputContainer}>
        <InputBase
          className={classes.input}
          placeholder="Workout name..."
          inputProps={{ 'aria-label': 'workout name...', 'data-testid': 'workoutNameInput' }}
          onChange={event => setWorkoutName(event.target.value)}
        />
      </Paper>

      <div>
        <Button variant="contained">Add exercise</Button>
      </div>

      <ButtonGroup variant="contained">
        <Button>Cancel</Button>
        <Button>Save</Button>
      </ButtonGroup>
    </Container>
  );
};

export default AddWorkout;
