import * as React from 'react';
import { useState } from 'react';
import {
  Container,
  makeStyles,
  createStyles,
  Paper,
  InputBase,
  IconButton,
  Button,
  Theme,
  Modal,
  Backdrop,
  Fade,
} from '@material-ui/core';
import { Link } from '@reach/router';
import { Clear, Save } from '@material-ui/icons';
import ExercisesView from '../Exercises/ExerciseList/ExercisesView';
import { useStore } from '../../Context';
import { Exercise } from '../../Interfaces/Interfaces';

const useStyles = makeStyles((theme: Theme) =>
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
    link: {
      textDecoration: 'none',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    exercisesViewContainer: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 10,
      outline: 'none',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 1, 3),
      height: '80%',
    },
    exercisesContainer: {
      marginTop: 20,
    },
  }),
);

const AddWorkout = () => {
  const initialExercises: Exercise[] = [];
  const classes = useStyles();
  const store = useStore();

  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState(initialExercises);
  const [showExercisesView, setShowExercisesView] = useState(false);
  console.log(workoutName, showExercisesView);

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
        <Button variant="contained" onClick={() => setShowExercisesView(true)}>
          Add exercise
        </Button>
      </div>

      <Modal
        className={classes.modal}
        open={showExercisesView}
        onClose={() => setShowExercisesView(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        data-testid="modal"
      >
        <Fade in={showExercisesView}>
          <div className={classes.exercisesViewContainer}>
            <ExercisesView
              exercises={store.exercises}
              bodyParts={store.bodyParts}
              onChange={(exercises: Exercise[]) => (store.exercises = exercises)}
              addToWorkout={(exercise: Exercise) => {
                setExercises(exercises.concat(exercise));
                setShowExercisesView(false);
              }}
            />
          </div>
        </Fade>
      </Modal>

      <Container className={classes.exercisesContainer} maxWidth="sm">
        {exercises.map(exercise => (
          <div>{exercise.name}</div>
        ))}
      </Container>

      <Link to="/workouts">
        <IconButton>
          <Clear />
        </IconButton>
      </Link>
      <Link to="/workouts">
        <IconButton>
          <Save />
        </IconButton>
      </Link>
    </Container>
  );
};

export default AddWorkout;
