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
    exerciseList: Exercise[];
    sortDirection: string;
}

class ExerciseLibraryView extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            exerciseList: [],
            sortDirection: 'asc'
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
            this.setState({ 
                exerciseList: exerciseList.sort(this.sortAscending('name')) 
            });
            console.log("[ExerciseLibraryView] fetch. ", this.state.exerciseList);
        })
        // temporary code that just adds in test data hardcoded at top of file
        if (this.state.exerciseList.length == 0) 
            this.setState({ 
                exerciseList: data.sort(this.sortAscending('name')) 
            });
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
        if (this.state.sortDirection === 'asc') {
            exerciseList.sort(this.sortAscending(column));
            this.setState({ exerciseList, sortDirection: 'desc' });
        }
        if (this.state.sortDirection === 'desc') {
            exerciseList.sort(this.sortDescending(column));
            this.setState({ exerciseList, sortDirection: 'asc' });
        }
    }

    render() {
        return ( 
            <div className="exercise-library-view-container">
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <td onClick={() => this.sortBy('name')}>Name</td>
                            <td onClick={() => this.sortBy('notes')}>Notes</td>                            
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