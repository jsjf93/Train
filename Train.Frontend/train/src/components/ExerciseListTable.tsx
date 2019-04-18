import React, { Component } from 'react';
import { Table, Modal, Form, Button } from '../../node_modules/react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Exercise } from './index';
import './ExerciseListTable.css';
import { MdDelete } from 'react-icons/md';

interface IProps {
    exerciseList: Exercise[];
    handleRemoveClick: (id: number) => void;
}

interface IState {
    exerciseList: Exercise[];
    sortDirection: string;
    showExerciseModal: boolean;
    showRemoveExerciseModal: boolean;
    selectedExercise?: Exercise;
    input: string;
}

class ExerciseListTable extends Component<IProps, IState>{
    exerciseNameInput: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            exerciseList: this.props.exerciseList,
            sortDirection: 'asc',
            showExerciseModal: false,
            showRemoveExerciseModal: false,
            selectedExercise: undefined,
            input: ""
        }
        this.exerciseNameInput = React.createRef();
    }

    componentDidUpdate() {
        if (this.state.exerciseList !== this.props.exerciseList) {
            this.setState({ exerciseList: this.props.exerciseList.sort(this.sortAscending('name')) });
        }
    }

    private sortAscending = (column: string) => {
        return function (a: any, b: any) {
            if (a[column] < b[column]) return -1;
            if (a[column] > b[column]) return 1;
            return 0;
        };
    }

    private sortDescending = (column: string) => {
        return function (a: any, b: any) {
            if (a[column] > b[column]) return -1;
            if (a[column] < b[column]) return 1;
            return 0;
        };
    }

    private sortBy = (column: string) => {
        const exerciseList = this.state.exerciseList;
        if (this.state.sortDirection === 'desc') {
            exerciseList.sort(this.sortAscending(column));
            this.setState({ exerciseList, sortDirection: 'asc' });
        }
        if (this.state.sortDirection === 'asc') {
            exerciseList.sort(this.sortDescending(column));
            this.setState({ exerciseList, sortDirection: 'desc' });
        }
    }

    private handleClose = () => {
        this.setState({ showExerciseModal: false});
    }

    private handleShow = (exercise: Exercise) => {
        this.setState({ showExerciseModal: true, selectedExercise: exercise, input: exercise.name});
    }

    private handleCloseRemoveExerciseModal = () => {
        this.setState({ showRemoveExerciseModal: false});
    }

    private handleShowRemoveExerciseModal = (exercise: Exercise) => {
        this.setState({ showRemoveExerciseModal: true, selectedExercise: exercise, input: exercise.name});
    }

    private handleRemove = () => {
        this.props.handleRemoveClick(this.state.selectedExercise!.id);
        this.handleCloseRemoveExerciseModal();
    }

    private updateExercise = () => {
        const updatedExerciseId = this.state.selectedExercise!.id;
        const updatedExercise = this.exerciseNameInput.current.value;

        fetch('https://localhost:44303/api/exerciselibrary/' + updatedExerciseId , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: updatedExerciseId,
                name: updatedExercise,
                notes: this.state.selectedExercise!.notes
            })
        })
        .then(result => {
            if (result.ok) {
                const exerciseList: Exercise[] = [];
                exerciseList.push({ 
                    id: updatedExerciseId, 
                    name: updatedExercise, 
                    notes: this.state.selectedExercise!.notes
                });
                this.setState({ exerciseList: Object.assign(this.state.exerciseList, exerciseList)});
            }
        })

        this.handleClose();
    }

    private onChangeHandler = (event: any) => {
        const input = event.target.value;
        this.setState({ input });
    }

    render() {
        return (
            <>
                <Modal show={this.state.showExerciseModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Exercise</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Exercise Name</Form.Label>
                                <Form.Control 
                                    type="text"
                                    value={this.state.input}
                                    ref={this.exerciseNameInput}
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>
                        </Form>
                        <Button 
                            variant="success" 
                            type="submit"
                            onClick={this.updateExercise}
                        >
                            Update Exercise
                        </Button>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showRemoveExerciseModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove Exercise</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to remove this exercise?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseRemoveExerciseModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.handleRemove}>
                            Remove
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <td onClick={() => this.sortBy('name')}>Name</td> 
                            <td></td>                        
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.exerciseList.map(exercise => {
                            return [
                                <tr key={exercise.id}>
                                    <td onClick={() => this.handleShow(exercise)}>
                                        {exercise.name}
                                    </td>
                                    <td className="exercise-remove-icon-container">
                                        <MdDelete 
                                            className="exercise-remove-icon"
                                            size={20}
                                            onClick={() => this.handleShowRemoveExerciseModal(exercise)}
                                        />
                                    </td>
                                </tr>
                            ]
                        })}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default ExerciseListTable;