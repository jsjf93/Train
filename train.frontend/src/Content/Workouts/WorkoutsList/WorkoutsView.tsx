import * as React from 'react';
import { Workout } from '../../../Interfaces/Interfaces';
import { useState } from 'react';
import { Container, Modal, Backdrop, Fade, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import WorkoutCard from '../../../Components/WorkoutCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 20,
      padding: 0,
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
    iconButton: {
      padding: 10,
    },
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
    formGroupContainer: {
      maxWidth: 500,
    },
  }),
);

interface IProps {
  workouts: Workout[];
  onChange: (workouts: Workout[]) => void;
}

const WorkoutsView: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();

  const [showWorkoutModal, setShowWorkoutModal] = useState(false);

  //const onAddWorkout = (workout: Workout) => props.onChange(props.workouts.concat(workout));
  const onDeleteWorkout = (id: number) => props.onChange(props.workouts.filter(w => w.id !== id));
  const onEditWorkout = (workout: Workout) =>
    props.onChange(props.workouts.map(w => (w.id === workout.id ? workout : w)));

  const workouts = props.workouts.map((w, key) => (
    <Grid key={w.name + key} item xs={12} sm={6} md={4}>
      <WorkoutCard workout={w} onDeleteWorkout={onDeleteWorkout} onEditWorkout={onEditWorkout} />
    </Grid>
  ));

  // workouts.push(
  //   <Grid key={'add-workout-key'} item xs={12} sm={6} md={4} onClick={() => setShowWorkoutModal(!showWorkoutModal)}>

  //   </Grid>,
  // );

  return (
    <Container maxWidth="md" data-testid="outerContainer">
      {/* {showAddWorkoutModal && <AddWorkoutModal newWorkoutId={Math.max(...props.workouts.map(w => w.id)) + 1} />} */}
      <Modal
        className={classes.modal}
        open={showWorkoutModal}
        onClose={() => setShowWorkoutModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        data-testid="modal"
      >
        <Fade in={showWorkoutModal}>
          <div className={classes.paper}>Workout</div>
        </Fade>
      </Modal>
      <Grid container spacing={3} justify="center" alignItems="stretch">
        {workouts}
      </Grid>
    </Container>
  );
};

export default WorkoutsView;
