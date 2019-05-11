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
    {
        id: 3,
        name: 'Leg Day',
        exercises: [
            { id: 1, name: 'Squats', exerciseType: ExerciseType.Strength },
            { id: 2, name: 'Running', exerciseType: ExerciseType.Duration },
            { id: 3, name: 'Bulgarian Split Squats', exerciseType: ExerciseType.Strength }
        ],
    },
    {
        id: 4,
        name: 'Bouldering A',
        exercises: [
            { id: 1, name: '4x4 Boulders', exerciseType: ExerciseType.Interval },
            { id: 2, name: 'Max Strength Hangboarding', exerciseType: ExerciseType.Interval }
        ],
    },
    {
        id: 5,
        name: 'Bouldering B',
        exercises: [
            { id: 1, name: 'Lead Climbing', exerciseType: ExerciseType.Interval },
            { id: 2, name: 'Power Endurance Hangboarding', exerciseType: ExerciseType.Interval }
        ],
    },
    {
        id: 6,
        name: 'Day 1',
        exercises: [
            { id: 1, name: 'Weighted Pullups', exerciseType: ExerciseType.Strength },
            { id: 2, name: 'OHP', exerciseType: ExerciseType.Strength },
            { id: 3, name: 'Dumbbell Rows', exerciseType: ExerciseType.Strength },
            { id: 4, name: 'Reverse Flyes', exerciseType: ExerciseType.Strength },
            { id: 5, name: 'Seated Curls', exerciseType: ExerciseType.Strength },
        ],
    },
    {
        id: 7,
        name: 'Day 2',
        exercises: [
            { id: 1, name: 'Incline Bench Press', exerciseType: ExerciseType.Strength },
            { id: 2, name: 'Barbell Rows', exerciseType: ExerciseType.Strength },
            { id: 3, name: 'Dips', exerciseType: ExerciseType.Strength },
            { id: 4, name: 'Lateral Raises', exerciseType: ExerciseType.Strength },
            { id: 5, name: 'Tricep Extensions', exerciseType: ExerciseType.Strength },
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