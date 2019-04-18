import React, { Component } from 'react';
import { Form, Button, Modal } from '../../node_modules/react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './ExerciseLibraryView.css'

import { Exercise } from './index';
import ExerciseListTable from './ExerciseListTable';

interface IProps {

}

interface IState {
    initialExerciseList: Exercise[];
    exerciseList: Exercise[];
    sortDirection: string;
    input: string;
    showExerciseModal: boolean;
}

class ExerciseLibraryView extends Component<IProps, IState> {
    private exerciseNameInput: any;
    
    constructor(props: IProps) {
        super(props);
        this.state = {
            initialExerciseList: [],
            exerciseList: [],
            sortDirection: 'asc',
            input: "",
            showExerciseModal: false
        }
        this.exerciseNameInput = React.createRef();
    }

    componentDidMount() {
        fetch('https://localhost:44303/api/exerciselibrary')
        .then(result => {
            if (result.ok) {
                return result.json();
            } else {
                console.log(`[ExerciseLibraryView] componentDidMount() Request rejected. Status: ${result.status}`);
            }
        })
        .then(data => {
            if (!data) {
                return;
            }
            const exerciseList: Exercise[] = [];
            data.map((row: Exercise) => exerciseList.push(row))
            this.setState({ 
                initialExerciseList: exerciseList,
                exerciseList
            });
            console.log("[ExerciseLibraryView] fetch. ", this.state.initialExerciseList);
        })
    }

    private search = (event: any) => {
        const input = event.target.value.toLowerCase();
        this.setState({ input });

        const exerciseList = this.state.initialExerciseList.filter(exercise => 
            exercise.name.toLowerCase().includes(input)
        );

        this.setState({
            exerciseList
        });
    }

    private handleClose = () => {
        this.setState({showExerciseModal: false });
    }

    private handleShow = () => {
        this.setState({showExerciseModal: true });
    }

    private addExercise = () => {
        const newExercise = this.exerciseNameInput.current.value;

        fetch('https://localhost:44303/api/exerciselibrary', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newExercise,
                notes: 'test',
            })
        })
        .then(result => {
            if (result.ok) {
                return result.json();
            }
        })
        .then(data => {
            if (!data) {
                return;
            }
            const exerciseList = this.state.exerciseList;
            exerciseList.push(data);
            this.setState({initialExerciseList: exerciseList, exerciseList});
        })

        this.handleClose();
    }

    private handleRemoveClick = (id: number) => {
        fetch('https://localhost:44303/api/exerciselibrary/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(result => {
            if (result.ok) {
                this.setState({ 
                    initialExerciseList: this.state.initialExerciseList.filter(exercise => exercise.id !== id),
                    exerciseList: this.state.exerciseList.filter(exercise => exercise.id !== id)
                });
            }
        })
    }

    render() {
        return ( 
            <>
                <Modal show={this.state.showExerciseModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Exercise</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Exercise Name</Form.Label>
                                <Form.Control 
                                    type="text"
                                    ref={this.exerciseNameInput}
                                />
                            </Form.Group>
                        </Form>
                        <Button 
                            variant="success" 
                            type="submit"
                            onClick={this.addExercise}
                        >
                            Add Exercise
                        </Button>
                    </Modal.Body>
                </Modal>
                <div className="exercise-library-view-container">
                    <div className="exercise-library-search-add-container">
                        <Form className="exercise-library-search">
                            <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search exercises" 
                                    onChange={this.search}
                                />
                            </Form.Group>
                        </Form>
                        <Button 
                            className="exercise-library-add-button"
                            variant="success"
                            onClick={this.handleShow}
                        >
                            Add
                        </Button>
                    </div>
                    <ExerciseListTable 
                        exerciseList={this.state.exerciseList} 
                        handleRemoveClick={this.handleRemoveClick}
                    />
                </div>
            </>
        )
    }
}

export default ExerciseLibraryView;