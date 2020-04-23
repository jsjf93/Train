import * as React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, FormControl, Input, InputAdornment, createStyles, makeStyles, IconButton } from '@material-ui/core';
import { Alarm } from '@material-ui/icons';

const useStyles = makeStyles(() => 
  createStyles({
    exerciseWeightControl: {
      width: 70,
    },
  })
)
const StrengthTable = () => {
  const classes = useStyles();
  
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
          <TableRow>
            <TableCell component="th" scope="row">
              1
            </TableCell>
            <TableCell component="th" scope="row">
              <FormControl className={classes.exerciseWeightControl}>
                <Input endAdornment={<InputAdornment position="end">Kg</InputAdornment>} />
              </FormControl>
            </TableCell>
            <TableCell component="th" scope="row">
              1
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StrengthTable;