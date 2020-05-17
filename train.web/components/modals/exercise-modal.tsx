import { Modal, FormControl, Form, Button } from "react-bootstrap";
import { useState } from "react";
import AddButton from "../exercises/add-button";
import { IBodyPart } from "../interfaces";

const GetBodyPartCheckBoxes = (): { [bodyPart: string] : { checked: boolean } } => {
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

  return Object.assign({}, ...bodyParts.map(bodyPart => ({ [bodyPart]: { checked: false } })));
}

interface IProps {
  show: boolean;
  buttonText: string;
  handleClick: (name: string, bodyParts: IBodyPart[]) => void;
  handleClose: () => void;
}

export const ExerciseModal = (props: IProps) => {
  const [exerciseName, setExerciseName] = useState('');
  const [bodyPartsUsed, setBodyPartsUsed] = useState(GetBodyPartCheckBoxes());

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

    props.handleClick(exerciseName, bodyParts);
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
          <AddButton 
            buttonText={props.buttonText}
            handleClick={submit}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
