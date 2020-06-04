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
import { IExercise } from '../../../Definitions/Interfaces';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';

interface IProps {
  exercises: IExercise[];
  bodyParts: string[];
  onChange: (exercises: IExercise[]) => void;
  addToWorkout?: (exercise: IExercise) => void;
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
  const [searchInput, setSearchInput] = useState('');
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');

  const getInitialBodyPartsCheckboxes = () => {
    return Object.assign({}, ...props.bodyParts.map(bodyPart => ({ [bodyPart]: { checked: false } })));
  };
  const [newExerciseBodyParts, setNewExerciseBodyParts] = useState(getInitialBodyPartsCheckboxes());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewExerciseBodyParts({ ...newExerciseBodyParts, [event.target.name]: { checked: event.target.checked } });
  };

  const resetState = () => {
    setNewExerciseName('');
    setNewExerciseBodyParts(getInitialBodyPartsCheckboxes());
    setShowExerciseModal(false);
  };

  const getSelectedBodyParts = (): string[] => {
    const bodyPartsUsed: string[] = [];
    Object.keys(newExerciseBodyParts).forEach(bodyPartKey => {
      if (newExerciseBodyParts[bodyPartKey].checked) {
        bodyPartsUsed.push(bodyPartKey);
      }
    });

    return bodyPartsUsed;
  };

  const handleAddExercise = () => {
    const bodyPartsUsed = getSelectedBodyParts();

    if (newExerciseName && bodyPartsUsed.length) {
      const exercises = props.exercises;
      exercises.push({
        exerciseId: props.exercises[props.exercises.length - 1].exerciseId + 1,
        exerciseName: newExerciseName,
        bodyPartsUsed,
      });

      props.onChange(exercises);

      resetState();
    }
  };

  const handleAddToWorkout = (exercise: IExercise) => {
    if (props.addToWorkout) {
      props.addToWorkout(exercise);
    }
  };

  const exercises = props.exercises.filter(e => e.exerciseName.toLowerCase().includes(searchInput));

  const classes = useStyles();

  return (
    <Container maxWidth="md" data-testid="outerContainer">
      <Container className={classes.root} data-testid="inputFieldContainer">
        <Paper component="form" aria-label="menu" className={classes.inputContainer} elevation={3}>
          <SearchIcon data-testid="searchIcon" />
          <InputBase
            className={classes.input}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search...' }}
            onChange={event => setSearchInput(event.target.value.toLowerCase())}
            data-testid="inputBase"
          />
        </Paper>
        <Button
          size="small"
          variant="contained"
          aria-label="new exercise"
          onClick={() => setShowExerciseModal(true)}
          data-testid="newExerciseButton"
        >
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
        data-testid="modal"
      >
        <Fade in={showExerciseModal}>
          <div className={classes.paper}>
            <h2 id="add-new-exercise">New Exercise</h2>
            <Paper component="form" aria-label="menu" className={classes.inputContainer}>
              <InputBase
                className={classes.input}
                placeholder="Exercise name..."
                inputProps={{ 'aria-label': 'exercise name...', 'data-testid': 'exerciseNameInput' }}
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
                      <Checkbox
                        checked={newExerciseBodyParts[key].checked}
                        onChange={handleChange}
                        name={key}
                        data-testid={key + 'Checkbox'}
                      />
                    }
                    label={key}
                  />
                ))}
              </FormGroup>
            </div>
            <Button
              size="small"
              variant="contained"
              aria-label="new exercise"
              onClick={handleAddExercise}
              disabled={!newExerciseName && !getSelectedBodyParts().length}
              data-testid="addExerciseButton"
            >
              Add exercise
            </Button>
          </div>
        </Fade>
      </Modal>

      <TableContainer component={Paper} elevation={3} data-testid="tableContainer">
        <Table size="small">
          <TableHead>
            <TableRow data-testid="tableColumnNameRow">
              <TableCell>Exercise name</TableCell>
              <TableCell>Body parts used</TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="tableBody">
            {exercises.map(exercise => (
              <TableRow key={exercise.exerciseName} onClick={() => handleAddToWorkout(exercise)}>
                <TableCell component="th" scope="row">
                  {exercise.exerciseName}
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
