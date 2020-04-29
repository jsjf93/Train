import * as React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, FormControl, Input, InputAdornment, createStyles, makeStyles, IconButton, TextField } from '@material-ui/core';
import { Alarm } from '@material-ui/icons';
import { IStrengthSet, IStrengthData, IWorkoutExercise } from '../../../Definitions/Interfaces';

const useStyles = makeStyles(() => 
  createStyles({
    formControl: {
      maxWidth: 70,
    },
    timeForm: {
      display: 'flex'
    },
    timeField: {
      marginLeft: 10
    }
  })
)

interface IProps {
  workoutExercise: IWorkoutExercise;
  onChange: (workoutExercise: IWorkoutExercise) => void;
}

const StrengthTable = (props: IProps) => {
  const classes = useStyles();

  const exerciseData = props.workoutExercise.exerciseData as IStrengthData;

  const handleChange = (rowId: number, prop: keyof IStrengthSet) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { workoutExercise } = props;
    const workoutData = workoutExercise.exerciseData as IStrengthData;
    let exerciseSet = workoutData.sets.find(s => s.id === rowId);

    if (exerciseSet) {
      exerciseSet = { ...exerciseSet, [prop]: event.target.value };
      workoutData.sets = workoutData.sets.map(set => set.id === exerciseSet!.id ? exerciseSet : set) as IStrengthSet[];
      workoutExercise.exerciseData = workoutData;
      props.onChange(workoutExercise);
    }
  };
  
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Set</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>
              <IconButton>
                <Alarm />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exerciseData.sets.map(set => (
            <TableRow key={set.id}>
              <TableCell>{set.id}</TableCell>
              <TableCell>
                <FormControl className={classes.formControl}>
                  <Input
                    defaultValue={set.weight || ''}
                    endAdornment={<InputAdornment position="end">Kg</InputAdornment>} 
                    onChange={handleChange(set.id, 'weight')}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl className={classes.formControl}>
                  <Input
                    defaultValue={set.reps || ''}
                    onChange={handleChange(set.id, 'reps')}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <form className={classes.timeForm}>
                  <TextField className={classes.timeField} placeholder="minutes" />
                  <TextField className={classes.timeField} placeholder="seconds" />
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StrengthTable;