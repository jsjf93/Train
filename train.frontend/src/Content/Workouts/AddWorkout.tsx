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
  Grid,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { Link } from '@reach/router';
import { Clear, Save } from '@material-ui/icons';
import ExercisesView from '../Exercises/ExerciseList/ExercisesView';
import { useStore } from '../../Context';
import { Exercise } from '../../Definitions/Interfaces';
import { ExerciseType } from '../../Definitions/Enums';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    exerciseNameContainer: {
      margin: '16px 0 16px 16px',
      display: 'flex',
      alignItems: 'baseline',
    },
    formControl: {
      marginLeft: 16,
      minWidth: 90,
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
    <Container maxWidth="sm" data-testid="outerContainer">
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
          <Grid key={exercise.id} container spacing={3} justify="center" alignItems="stretch">
            <Grid item xs={12}>
              <Paper>
                <Grid container>
                  <Grid item xs={12}>
                    <div className={classes.exerciseNameContainer}>
                      <strong>{exercise.name}</strong>
                      <FormControl className={classes.formControl}>
                        <Select placeholder="Exercise type">
                          <MenuItem value={ExerciseType.Duration}>Duration</MenuItem>
                          <MenuItem value={ExerciseType.Interval}>Interval</MenuItem>
                          <MenuItem value={ExerciseType.Strength}>Strength</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Set</TableCell>
                            <TableCell>Weight (kg)</TableCell>
                            <TableCell>Reps</TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
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
