import React, { Component } from "react";
import { IWorkout } from './index';
import { Card } from 'react-bootstrap';
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
                {this.props.workoutList.map(workout =>
                    <Card className="workout-card" bg="dark" text="white" style={{ width: '18rem' }}>
                        <Card.Header>{workout.name}</Card.Header>
                        <Card.Body>
                            {workout.exercises.map(exercise =>
                                <Card.Text><p>{exercise.name}</p></Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                )}
            </div>
        );
    }
}

export default WorkoutList;