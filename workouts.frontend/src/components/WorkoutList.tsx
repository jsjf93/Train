import React, { Component } from "react";
import { IWorkout, IExercise } from './index';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './WorkoutList.css';

interface IProps {
    workoutList: IWorkout[];
}

interface IState {
}

class WorkoutList extends Component<IProps, IState> {
    public render() {
        return (
            <div className="workout-list-container">
                {this.props.workoutList.map((workout, id) =>
                    <Card 
                        key={id} 
                        className="workout-card" 
                        bg="dark" 
                        text="white"
                    >
                        <Card.Header>{workout.name}</Card.Header>
                        <Card.Body>
                            {this.renderFirstThreeExercises(workout.exercises).map((exercise, id) =>
                                <Card.Text key={id}>{exercise.name}</Card.Text>
                            )}
                            {<Card.Text>...</Card.Text>}
                        </Card.Body>
                        <Card.Footer className="card-footer">
                            <ButtonGroup>
                                <Button variant="secondary">View</Button>
                                <Button variant="success">Start</Button>
                            </ButtonGroup>
                        </Card.Footer>
                    </Card>
                )}
            </div>
        );
    }

    private renderFirstThreeExercises(exercises: IExercise[]): IExercise[] {
        if (exercises.length < 3) {
            return exercises;
        }

        let firstThreeExercises: IExercise[] = [];
        for (let i = 0; i < 3; i++) {
            firstThreeExercises.push(exercises[i]);
        }
        return firstThreeExercises;
    }
}

export default WorkoutList;