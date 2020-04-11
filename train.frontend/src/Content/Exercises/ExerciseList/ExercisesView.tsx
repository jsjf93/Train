import * as React from 'react';
import {
  Container,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Paper,
  InputBase,
  makeStyles,
  createStyles,
  Button,
} from '@material-ui/core';
import { Exercise } from '../../../Interfaces/Interfaces';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';

interface IProps {
  exercises: Exercise[];
  onChange: (exercises: Exercise[]) => void;
}

const useStyles = makeStyles(() =>
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
    addButton: {},
  }),
);

const ExercisesView: React.FC<IProps> = (props: IProps) => {
  const [searchInput, setSearchInput] = useState('');
  const exercises = props.exercises.filter(e => e.name.toLowerCase().includes(searchInput));

  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Container className={classes.root}>
        <Paper component="form" aria-label="menu" className={classes.inputContainer} elevation={3}>
          <SearchIcon />
          <InputBase
            className={classes.input}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search...' }}
            onChange={event => setSearchInput(event.target.value.toLowerCase())}
          />
        </Paper>
        <Button
          size="small"
          variant="contained"
          color="primary"
          className={classes.addButton}
          aria-label="new exercise"
        >
          New exercise
        </Button>
      </Container>

      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Exercise name</TableCell>
              <TableCell>Body parts used</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exercises.map(exercise => (
              <TableRow key={exercise.name}>
                <TableCell component="th" scope="row">
                  {exercise.name}
                </TableCell>
                <TableCell>{exercise.bodyPartsUsed.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default ExercisesView;
