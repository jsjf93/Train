import * as React from 'react';
import './AddWorkoutModal.css';
import { useState } from 'react';
import { IWorkout } from '../../Definitions/Interfaces';
import { Modal, Backdrop, Fade, createStyles, Theme, makeStyles, Paper, InputBase, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 10,
      outline: 'none',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    inputContainer: {
      padding: '0px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 300,
      marginBottom: 20,
    },
    input: {
      flex: 1,
    },
  }),
);

interface IProps {
  onAddWorkout: (workout: IWorkout) => void;
  showModal: boolean;
  closeModal: () => void;
}

const AddWorkoutModal = (props: IProps): JSX.Element => {
  const classes = useStyles();
  //const initialWorkoutExercises: WorkoutExercise[] = [];

  const [workoutName, setWorkoutName] = useState('');
  //const [workoutExercises, setWorkoutExercises] = useState(initialWorkoutExercises);
  console.log(workoutName);

  return (
    <Modal
      className={classes.modal}
      open={props.showModal}
      onClose={props.closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      data-testid="modal"
    >
      <Fade in={props.showModal}>
        <div className={classes.paper}>
          <h2 id="add-new-exercise">New Workout</h2>
          <Paper component="form" aria-label="menu" className={classes.inputContainer}>
            <InputBase
              className={classes.input}
              placeholder="Workout name..."
              inputProps={{ 'aria-label': 'workout name...', 'data-testid': 'workoutNameInput' }}
              onChange={event => setWorkoutName(event.target.value)}
            />
          </Paper>
          <Button
            size="small"
            variant="contained"
            aria-label="add exercise"
            onClick={() => console.log('click')}
            data-testid="addExerciseButton"
          >
            Add exercise
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddWorkoutModal;
