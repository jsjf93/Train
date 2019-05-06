import React, { Component } from 'react';
import { ExerciseType, IWorkout } from './index';
import WorkoutList from './WorkoutList';

const data: IWorkout[] = [
    {
        id: 1,
        name: 'Back Day',
        exercises: [
            { id: 1, name: 'Weighted Pullups', exerciseType: ExerciseType.Strength },
            { id: 2, name: 'Deadlifts', exerciseType: ExerciseType.Strength },
            { id: 3, name: 'Renegade Rows', exerciseType: ExerciseType.Interval }
        ],
    },
    {
        id: 2,
        name: 'Core Day',
        exercises: [
            { id: 1, name: 'Hanging Leg Raises', exerciseType: ExerciseType.Strength },
            { id: 2, name: 'Mountain Climbers', exerciseType: ExerciseType.Interval },
            { id: 3, name: 'Plank', exerciseType: ExerciseType.Duration }
        ],
    },
];

interface IProps {

}

interface IState {
    initialWorkoutList: IWorkout[];
    workoutList: IWorkout[];
}

class WorkoutLibraryView extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            initialWorkoutList: [],
            workoutList: [],
        }
    }

    public componentDidMount() {
        // to do - actual fetch
        this.setState({ 
            initialWorkoutList: data,
            workoutList: data
        })
    }

    public render() {
        return (
            <div className="workout-library-container">
                <WorkoutList workoutList={this.state.workoutList} />
            </div>
        );
    }
}

export default WorkoutLibraryView;