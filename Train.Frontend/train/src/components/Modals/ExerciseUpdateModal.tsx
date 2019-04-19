import React from 'react';
import { Form, Button, Modal } from '../../../node_modules/react-bootstrap';

interface IProps {
    showExerciseModal: boolean;
    handleClose: () => void;
    value: string;
    exerciseNameInput: () => void;
    onChangeHandler: (event: any) => void;
    handleUpdate: () => void;
}

const ExerciseUpdateModal = (props: IProps) => {
    return (
        <Modal show={props.showExerciseModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Exercise Name</Form.Label>
                        <Form.Control 
                            type="text"
                            value={props.value}
                            ref={props.exerciseNameInput}
                            onChange={props.onChangeHandler}
                        />
                    </Form.Group>
                </Form>
                <Button 
                    variant="success" 
                    type="submit"
                    onClick={props.handleUpdate}
                >
                    Update Exercise
                </Button>
            </Modal.Body>
        </Modal>
    );
}

export default ExerciseUpdateModal;