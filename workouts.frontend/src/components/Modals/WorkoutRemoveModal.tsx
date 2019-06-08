import React from 'react';
import { Button, Modal } from '../../../node_modules/react-bootstrap';

import './WorkoutAddModal.css';

interface IProps {
    showWorkoutModal: boolean;
    handleClose: () => void;
    handleRemove: () => void;
}

const WorkoutRemoveModal = (props: IProps) => {
    return (
        <Modal show={props.showWorkoutModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove this workout?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button variant='danger' onClick={props.handleRemove}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WorkoutRemoveModal;