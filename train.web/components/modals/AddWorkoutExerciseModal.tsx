import { Modal, Button } from "react-bootstrap";
import { IExercise } from "../interfaces";
import ExerciseTable from "../exercises/exercise-table";

interface IProps {
  show: boolean;
  close: () => void;
  add: (exercise: IExercise) => void;
  exercises: IExercise[];
}

const AddWorkoutExerciseModal = (props: IProps) => (
  <Modal show={props.show} onHide={props.close}>
    <Modal.Header closeButton>
      <Modal.Title>Exercises</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ExerciseTable exercises={props.exercises} handleClick={props.add}/>
      <Button>Add</Button>
    </Modal.Body>
  </Modal>
);

export default AddWorkoutExerciseModal;