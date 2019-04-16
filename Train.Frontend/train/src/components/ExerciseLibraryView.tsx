import React, { Component } from 'react';
import { Form, Button, Modal } from '../../node_modules/react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './ExerciseLibraryView.css'

import { Exercise } from './index';
import ExerciseListTable from './ExerciseListTable';

const data = [
    { id: 1, name: "Running", notes: "n/a" }, 
    { id: 2, name: "Bicep Curls", notes: "Seated" }, 
    { id: 3, name: "Box Jumps", notes: "High reps" },
    { id: 4, name: "Climbing", notes: "n/a" }, 
    { id: 5, name: "Shoulder Press", notes: "Seated" }, 
    { id: 6, name: "Handstand", notes: "n/a" },
    { id: 7, name: "Boxing", notes: "n/a" }, 
    { id: 8, name: "Deadlift", notes: "n/a" }, 
    { id: 9, name: "Sprints", notes: "n/a" },
];

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
    exerciseNameInput: any;
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
        // temporary code that just adds in test data hardcoded at top of file
        if (this.state.initialExerciseList.length === 0) 
            this.setState({ initialExerciseList: data, exerciseList: data });
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
                                    placeholder=""
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
                    <ExerciseListTable exerciseList={this.state.exerciseList} />
                </div>
            </>
        )
    }
}

export default ExerciseLibraryView;