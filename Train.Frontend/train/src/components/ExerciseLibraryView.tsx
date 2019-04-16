import React, { Component } from 'react';
import { Form } from '../../node_modules/react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import { Exercise } from './index';
import ExerciseListTable from './ExerciseListTable';

const data = [
    { id: 1, name: "Running", notes: "n/a" }, 
    { id: 2, name: "Bicep Curls", notes: "Seated" }, 
    { id: 3, name: "Box Jumps", notes: "High reps" }
];

interface IProps {

}

interface IState {
    initialExerciseList: Exercise[];
    exerciseList: Exercise[];
    sortDirection: string;
    input: string;
}

class ExerciseLibraryView extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            initialExerciseList: [],
            exerciseList: [],
            sortDirection: 'asc',
            input: ""
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

    render() {
        return ( 
            <div className="exercise-library-view-container">
                <Form>
                    <Form.Group>
                        <Form.Control 
                            type="text" 
                            placeholder="Search exercises" 
                            onChange={this.search}
                        />
                    </Form.Group>
                </Form>
                <ExerciseListTable exerciseList={this.state.exerciseList} />
            </div>
        )
    }
}

export default ExerciseLibraryView;