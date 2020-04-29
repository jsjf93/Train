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
} from '@material-ui/core';
import { Link } from '@reach/router';
import { Clear, Save } from '@material-ui/icons';
import ExercisesView from '../Exercises/ExerciseList/ExercisesView';
import { useStore } from '../../Context';
import { IExercise, IWorkoutExercise, IStrengthData, IWorkout } from '../../Definitions/Interfaces';
import { ExerciseType } from '../../Definitions/Enums';
import StrengthTable from './WorkoutExerciseTables/StrengthTable';

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
  const classes = useStyles();
  const store = useStore();

  const [workoutName, setWorkoutName] = useState('');
  const [showExercisesView, setShowExercisesView] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState<IWorkoutExercise[]>([]);

  const handleExerciseAdd = (exercise: IExercise) => {
    const { id, name, bodyPartsUsed } = exercise;
    const workoutExercise: IWorkoutExercise = { 
      id, 
      name, 
      bodyPartsUsed, 
      exerciseType: ExerciseType.Strength, 
      exerciseData: { sets: [{ id: 1 }] } as IStrengthData 
    };
    setWorkoutExercises(workoutExercises.concat(workoutExercise));
    setShowExercisesView(false);
  };

  const handleWorkoutExerciseUpdate = (updatedExercise: IWorkoutExercise) => {
    setWorkoutExercises(workoutExercises.map(e => e.id === updatedExercise.id ? updatedExercise : e));
  }

  const handleAddNewSet = (workoutExercise: IWorkoutExercise) => {
    switch(workoutExercise.exerciseType) {
      case ExerciseType.Strength:
        const data = workoutExercise.exerciseData as IStrengthData;
        const id = Math.max(...data.sets.map(s => s.id)) + 1;
        data.sets.push({ id });
        workoutExercise.exerciseData = data;
        handleWorkoutExerciseUpdate(workoutExercise);
        break;
      default:
        console.log(`ExerciseType ${workoutExercise.exerciseType} has not been implemented.`);
    }
  }

  const saveWorkout = () => {
    let bodyPartsUsed: string[] = workoutExercises.map(e => e.bodyPartsUsed).reduce((total, current) => total.concat(current));
    const workout: IWorkout = {
      id: store.newWorkoutId,
      name: workoutName,
      exercises: workoutExercises,
      bodyPartsUsed
    };

    store.workouts.push(workout);
  }

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
              onChange={(exercises: IExercise[]) => (store.exercises = exercises)}
              addToWorkout={handleExerciseAdd}
            />
          </div>
        </Fade>
      </Modal>

      <Container className={classes.exercisesContainer} maxWidth="sm">
        {workoutExercises.map((exercise, key) => (
          <Grid key={exercise.id + key} container spacing={3} justify="center" alignItems="stretch">
            <Grid item xs={12}>
              <Paper>
                <Grid container>
                  <Grid item xs={12}>
                    <div className={classes.exerciseNameContainer}>
                      <strong>{exercise.name}</strong>
                      <FormControl className={classes.formControl}>
                        <Select placeholder="Exercise type" value={ExerciseType.Strength}>
                          <MenuItem value={ExerciseType.Duration}>Duration</MenuItem>
                          <MenuItem value={ExerciseType.Interval}>Interval</MenuItem>
                          <MenuItem value={ExerciseType.Strength}>Strength</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <StrengthTable
                      workoutExercise={exercise}
                      onChange={handleWorkoutExerciseUpdate} 
                    />
                  </Grid>
                </Grid>
                <div>
                  <Button variant="contained" onClick={() => handleAddNewSet(exercise)}>
                    Add Set
                  </Button>
                </div>
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
      <Link onClick={saveWorkout} to="/workouts">
        <IconButton>
          <Save />
        </IconButton>
      </Link>
    </Container>
  );
};

export default AddWorkout;
