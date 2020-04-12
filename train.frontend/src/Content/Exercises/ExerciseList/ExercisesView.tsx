import * as React from 'react';
import {
  Checkbox,
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
  Modal,
  Backdrop,
  Fade,
  Theme,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import { Exercise } from '../../../Interfaces/Interfaces';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { useStore } from '../../..';

interface IProps {
  exercises: Exercise[];
}

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

const ExercisesView: React.FC<IProps> = (props: IProps) => {
  const store = useStore();

  const [searchInput, setSearchInput] = useState('');
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseBodyParts, setNewExerciseBodyParts] = useState(
    Object.assign({}, ...store.bodyParts.map(bodyPart => ({ [bodyPart]: { checked: false } }))),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewExerciseBodyParts({ ...newExerciseBodyParts, [event.target.name]: { checked: event.target.checked } });
  };

  const resetState = () => {
    setNewExerciseName('');
    setNewExerciseBodyParts(
      Object.assign({}, ...store.bodyParts.map(bodyPart => ({ [bodyPart]: { checked: false } }))),
    );
    setShowExerciseModal(false);
  };

  const handleAddExercise = () => {
    const bodyPartsUsed: string[] = [];
    Object.keys(newExerciseBodyParts).forEach(bodyPartKey => {
      if (newExerciseBodyParts[bodyPartKey].checked) {
        bodyPartsUsed.push(bodyPartKey);
      }
    });

    if (newExerciseName && bodyPartsUsed.length) {
      store.exercises.push({
        id: store.exercises[store.exercises.length - 1].id + 1,
        name: newExerciseName,
        bodyPartsUsed,
      });

      resetState();
    }
  };

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
        <Button size="small" variant="contained" aria-label="new exercise" onClick={() => setShowExerciseModal(true)}>
          New exercise
        </Button>
      </Container>

      <Modal
        className={classes.modal}
        open={showExerciseModal}
        onClose={() => setShowExerciseModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showExerciseModal}>
          <div className={classes.paper}>
            <h2 id="add-new-exercise">New Exercise</h2>
            <Paper component="form" aria-label="menu" className={classes.inputContainer}>
              <InputBase
                className={classes.input}
                placeholder="Exercise name..."
                inputProps={{ 'aria-label': 'exercise name...' }}
                onChange={event => setNewExerciseName(event.target.value)}
              />
            </Paper>
            <h3 id="add-new-exercise">Body Parts</h3>
            <div className={classes.formGroupContainer}>
              <FormGroup row>
                {Object.keys(newExerciseBodyParts).map(key => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox checked={newExerciseBodyParts[key].checked} onChange={handleChange} name={key} />
                    }
                    label={key}
                  />
                ))}
              </FormGroup>
            </div>
            <Button size="small" variant="contained" aria-label="new exercise" onClick={handleAddExercise}>
              Add exercise
            </Button>
          </div>
        </Fade>
      </Modal>

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
