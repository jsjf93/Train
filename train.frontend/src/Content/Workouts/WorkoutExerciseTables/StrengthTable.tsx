import * as React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, FormControl, Input, InputAdornment, createStyles, makeStyles, IconButton } from '@material-ui/core';
import { Alarm } from '@material-ui/icons';
import { IStrengthSet } from '../../../Definitions/Interfaces';
import { useState } from 'react';

const useStyles = makeStyles(() => 
  createStyles({
    formControl: {
      maxWidth: 70,
    },
  })
)

interface IState {
  sets: IStrengthSet[];
}

const StrengthTable = () => {
  const classes = useStyles();
  
  const [exerciseSets, updateExerciseSets] = useState<IState>({
    sets: [{ id: 1, reps: 0, weight: 0, restDuration: {} }]
  }); 
  console.log(exerciseSets, updateExerciseSets);

  const handleChange = (rowId: number, prop: keyof IStrengthSet) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let exerciseSet = exerciseSets.sets.find(s => s.id === rowId);

    if (exerciseSet) {
      exerciseSet = { ...exerciseSet, [prop]: event.target.value };
      const sets = exerciseSets.sets.map(set => set.id === exerciseSet!.id ? exerciseSet : set) as IStrengthSet[];
      const newState: IState = { sets };
      updateExerciseSets(newState);
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
          {exerciseSets.sets.map(set => (
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
                {set.restDuration?.minutes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StrengthTable;