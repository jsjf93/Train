import * as React from 'react';
import { IWorkout } from '../../../Definitions/Interfaces';
import { Container, makeStyles, Theme, createStyles, Grid, Card, CardContent, IconButton } from '@material-ui/core';
import WorkoutCard from '../../../Components/WorkoutCard';
import { Add } from '@material-ui/icons';
import { Link } from '@reach/router';

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
    addWorkoutCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      boxShadow: '0px 0px 5px rgb(151, 151, 151)',
    },
  }),
);

interface IProps {
  workouts: IWorkout[];
  onChange: (workouts: IWorkout[]) => void;
}

const WorkoutsView: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();

  const onDeleteWorkout = (workout: IWorkout) => {
    const workouts = props.workouts.filter(w => w.id !== workout.id);
    props.onChange(workouts);
  };
  
  const onEditWorkout = (workout: IWorkout) =>
    props.onChange(props.workouts.map(w => (w.id === workout.id ? workout : w)));

  const workouts = props.workouts.map((w, key) => (
    <Grid key={w.name + key} item xs={12} sm={6} md={4}>
      <WorkoutCard workout={w} onDeleteWorkout={onDeleteWorkout} onEditWorkout={onEditWorkout} />
    </Grid>
  ));

  workouts.push(
    <Grid key={'add-workout-key'} item xs={12} sm={6} md={4}>
      <Card className={classes.addWorkoutCard}>
        <CardContent>
          <Link to={'/addworkout'}>
            <IconButton>
              <Add />
            </IconButton>
          </Link>
        </CardContent>
      </Card>
    </Grid>,
  );

  return (
    <Container maxWidth="md" data-testid="outerContainer">
      <Grid container spacing={3} justify="center" alignItems="stretch">
        {workouts}
      </Grid>
    </Container>
  );
};

export default WorkoutsView;
