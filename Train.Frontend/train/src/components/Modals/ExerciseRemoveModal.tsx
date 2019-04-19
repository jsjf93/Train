import React from 'react';
import { Button, Modal } from '../../../node_modules/react-bootstrap';

interface IProps {
    showRemoveExerciseModal: boolean;
    handleCloseRemoveModal: () => void;
    handleRemove: () => void;
}

const ExerciseRemoveModal = (props: IProps) => {
    return (
        <Modal show={props.showRemoveExerciseModal} onHide={props.handleCloseRemoveModal}>
            <Modal.Header closeButton>
                <Modal.Title>Remove Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove this exercise?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.handleCloseRemoveModal}>
                    Cancel
                </Button>
                <Button variant='danger' onClick={props.handleRemove}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExerciseRemoveModal;
