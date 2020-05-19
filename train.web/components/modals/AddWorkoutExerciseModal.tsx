import { Modal } from "react-bootstrap";

interface IProps {
  show: boolean;
  close: () => void;
}

const AddWorkoutExerciseModal = (props: IProps) => (
  <Modal show={props.show} onHide={props.close}>
    <Modal.Header closeButton>
      <Modal.Title>Exercises</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    </Modal.Body>
  </Modal>
);

export default AddWorkoutExerciseModal;