import { Modal, FormControl, Form, Button, Row } from "react-bootstrap";
import { useState } from "react";
import SubmitButton from "../exercises/submit-button";
import { IBodyPart, IExercise } from "../interfaces";

const GetBodyPartCheckBoxes = (selectedExercise?: IExercise): { [bodyPart: string] : { checked: boolean } } => {
  const bodyParts = [
    'Abs',
    'Chest',
    'Glutes',
    'Lower Back',
    'Lats',
    'Quadriceps',
    'Triceps',
    'Hamstrings',
    'Shoulders',
    'Biceps',
    'Forearms',
    'Trapezius',
    'Calves',
  ].sort();

  const bodyPartsCheckboxes = Object.assign({}, ...bodyParts.map(bodyPart => ({ [bodyPart]: { checked: false } })));

  if (selectedExercise) {
    selectedExercise.bodyPartsUsed.forEach(b => {
      if (bodyPartsCheckboxes[b.bodyPartName]) {
        bodyPartsCheckboxes[b.bodyPartName].checked = true;
      }
    });
  }

  return bodyPartsCheckboxes;
}

interface IProps {
  show: boolean;
  buttonText: string;
  selectedExercise?: IExercise;
  handleAdd?: (name: string, bodyParts: IBodyPart[]) => void;
  handleUpdate?: (exercise: IExercise) => void;
  handleDelete?: (exerciseId: number) => void;
  handleClose: () => void;
}

export const ExerciseModal = (props: IProps) => {
  const [exerciseName, setExerciseName] = useState(props.selectedExercise?.exerciseName || '');
  const [bodyPartsUsed, setBodyPartsUsed] = useState(GetBodyPartCheckBoxes(props.selectedExercise));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBodyPartsUsed({ ...bodyPartsUsed, [event.target.name]: { checked: event.target.checked } });
  };

  const submit = () => {
    const bodyParts: IBodyPart[] = [];
    Object.keys(bodyPartsUsed).forEach(bodyPartName => {
      if (bodyPartsUsed[bodyPartName].checked) {
        bodyParts.push({ bodyPartName });
      }
    });

    if (props.selectedExercise) {
      props.handleUpdate({ exerciseId: props.selectedExercise.exerciseId, exerciseName, bodyPartsUsed: bodyParts })
    } else {
      props.handleAdd(exerciseName, bodyParts);
    }
    props.handleClose();
  };

  const deleteExercise = () => {
    props.handleDelete(props.selectedExercise.exerciseId);
    props.handleClose();
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <FormControl
            size="lg"
            type="text"
            placeholder="Exercise name..."
            value={exerciseName}
            onChange={event => setExerciseName(event.target.value)}
          />
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(bodyPartsUsed).map(key => (
              <Form.Check 
                key={key}
                label={key}
                name={key}
                checked={bodyPartsUsed[key].checked}
                inline
                onChange={handleChange}
              />
            ))}
          </Form>
          <Row>
            <SubmitButton 
              buttonText={props.buttonText}
              handleClick={submit}
            />
            {props.selectedExercise && <Button
              variant="danger"
              onClick={deleteExercise}
            >
              Delete Exercise
            </Button>}
          </Row>
          
        </Modal.Body>
      </Modal>
    </>
  );
};
