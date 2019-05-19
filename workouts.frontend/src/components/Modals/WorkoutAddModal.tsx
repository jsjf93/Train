import React, { Component } from 'react';
import { Form, Button, Modal, Col, ListGroup } from '../../../node_modules/react-bootstrap';

import './WorkoutAddModal.css';
import { IExercise } from '../index';

const exerciseTypes = {
    0: 'Duration', 
    1: 'Interval', 
    2: 'Strength'
};

interface IProps {
    showWorkoutModal: boolean;
    handleClose: () => void;
    workoutNameInput: () => void;
    addWorkout: () => void;
    onChangeWorkoutExercises: (exercises: IExercise) => void;
    newWorkoutExercises: IExercise[];
}

interface IState {
    exerciseNameInput: string;
    exerciseType: string;
}

class WorkoutAddModal extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            exerciseNameInput: '', 
            exerciseType: 'Duration',
        };
    }

    private addExercise = () => {
        const exerciseType = Object.values(exerciseTypes).indexOf(this.state.exerciseType);
        debugger;
        this.props.onChangeWorkoutExercises({ name: this.state.exerciseNameInput, exerciseType });
        this.resetExerciseFields();
    }

    private onChangeExerciseName(exerciseNameInput: string) {
        this.setState({ exerciseNameInput });
    }

    private onChangeExerciseType(exerciseType: string) {
        this.setState({ exerciseType });
    }

    private resetExerciseFields() {
        this.setState({ exerciseNameInput: '', exerciseType: 'Duration'});
    }

    public render() {
        return (
            <div className="workout-add-modal-container">
                <Modal show={this.props.showWorkoutModal} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    ref={this.props.workoutNameInput} 
                                />
                            </Form.Group>
        
                            <Form.Label>Exercises</Form.Label>
                            <ListGroup>
                                {this.props.newWorkoutExercises.length === 0 ?
                                    <ListGroup.Item className="workout-add-modal-list-item">
                                        No exercises added yet
                                    </ListGroup.Item> :
                                    this.props.newWorkoutExercises.map(exercise => 
                                        <ListGroup.Item className="workout-add-modal-list-item">{exercise.name}</ListGroup.Item>
                                    )}
                            </ListGroup>
                            
                            <hr />

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label className="workout-modal-sub-label">Exercise Name</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        placeholder="Exercise name" 
                                        value={this.state.exerciseNameInput} 
                                        onChange={(event: any) => this.onChangeExerciseName(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="workout-modal-sub-label">Exercise Type</Form.Label>
                                    <Form.Control as="select" onChange={(event: any) => this.onChangeExerciseType(event.target.value)}>
                                        {Object.values(exerciseTypes).map((type, id) => 
                                            <option key={id}>{type}</option>    
                                        )}
                                        {/* TODO: Conditional rendering of other fields depending on exercise type selected 
                                            - Duration: exerciseDuration
                                            - Interval: exerciseDuration, restDuration, sets
                                            - Strength: reps, sets, restDuration
                                        */}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            
                            <div className="workout-modal-add-exercise-button-container">
                                <Button 
                                    className={'workout-modal-add-button'}
                                    variant="success"
                                    onClick={this.addExercise}
                                >
                                    Add
                                </Button>
                            </div>
                        </Form>
                        <hr />
                        <Button
                            className="workout-modal-add-button"
                            variant='success'
                            type='submit'
                            onClick={this.props.addWorkout}
                        >
                            Add Workout
                        </Button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
};

export default WorkoutAddModal;
