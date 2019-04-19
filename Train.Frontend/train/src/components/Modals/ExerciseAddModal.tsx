import React from 'react';
import { Form, Button, Modal } from '../../../node_modules/react-bootstrap';

interface IProps {
    showExerciseModal: boolean;
    handleClose: () => void;
    exerciseNameInput: () => void;
    addExercise: () => void;
}

const ExerciseAddModal = (props: IProps) => {
    return (
        <Modal show={props.showExerciseModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Exercise Name</Form.Label>
                        <Form.Control 
                            type="text"
                            ref={props.exerciseNameInput}
                        />
                    </Form.Group>
                </Form>
                <Button 
                    variant="success" 
                    type="submit"
                    onClick={props.addExercise}
                >
                    Add Exercise
                </Button>
            </Modal.Body>
        </Modal>
    );
}

export default ExerciseAddModal;