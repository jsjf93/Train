import React, { Component } from 'react';
import { Table } from '../../node_modules/react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const data = [
    { id: 1, name: "Running", notes: "n/a" }, 
    { id: 2, name: "Bicep Curls", notes: "Seated" }, 
    { id: 3, name: "Box Jumps", notes: "High reps" }
];

interface Exercise {
    id: number;
    name: string;
    notes: string;
}

interface IProps {

}

interface IState {
    exerciseList: Exercise[]
}

class ExerciseLibraryView extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            exerciseList: []
        }
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
            this.setState({ exerciseList });
            console.log("[ExerciseLibraryView] fetch. ", this.state.exerciseList);
        })
        // temporary code that just adds in test data hardcoded at top of file
        if (this.state.exerciseList.length == 0) 
            this.setState({ exerciseList: data });
    }

    render() {
        return ( 
            <div className="exercise-library-view-container">
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Notes</td>                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.exerciseList.map(exercise => {
                            return [
                                <tr key={exercise.id}>
                                    <td>{exercise.name}</td>
                                    <td>{exercise.notes}</td>
                                </tr>
                            ]
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ExerciseLibraryView;