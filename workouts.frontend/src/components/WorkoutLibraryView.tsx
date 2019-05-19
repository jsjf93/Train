import React, { Component } from 'react';
import { IWorkout, IExercise } from './index';
import WorkoutListTable from './WorkoutListTable';
import SearchAndAddBar from './SearchAndAddBar';
import WorkoutAddModal from './Modals/WorkoutAddModal';

// const data: IWorkout[] = [
//     {
//         id: 1,
//         workoutName: 'Back Day',
//         exercises: [
//             { id: 1, name: 'Weighted Pullups', exerciseType: ExerciseType.Strength },
//             { id: 2, name: 'Deadlifts', exerciseType: ExerciseType.Strength },
//             { id: 3, name: 'Renegade Rows', exerciseType: ExerciseType.Interval }
//         ],
//     },
//     {
//         id: 2,
//         workoutName: 'Core Day',
//         exercises: [
//             { id: 1, name: 'Hanging Leg Raises', exerciseType: ExerciseType.Strength },
//             { id: 2, name: 'Mountain Climbers', exerciseType: ExerciseType.Interval },
//             { id: 3, name: 'Plank', exerciseType: ExerciseType.Duration }
//         ],
//     },
//     {
//         id: 3,
//         workoutName: 'Leg Day',
//         exercises: [
//             { id: 1, name: 'Squats', exerciseType: ExerciseType.Strength },
//             { id: 2, name: 'Running', exerciseType: ExerciseType.Duration },
//             { id: 3, name: 'Bulgarian Split Squats', exerciseType: ExerciseType.Strength }
//         ],
//     },
//     {
//         id: 4,
//         workoutName: 'Bouldering A',
//         exercises: [
//             { id: 1, name: '4x4 Boulders', exerciseType: ExerciseType.Interval },
//             { id: 2, name: 'Max Strength Hangboarding', exerciseType: ExerciseType.Interval }
//         ],
//     },
//     {
//         id: 5,
//         workoutName: 'Bouldering B',
//         exercises: [
//             { id: 1, name: 'Lead Climbing', exerciseType: ExerciseType.Interval },
//             { id: 2, name: 'Power Endurance Hangboarding', exerciseType: ExerciseType.Interval }
//         ],
//     },
//     {
//         id: 6,
//         workoutName: 'Day 1',
//         exercises: [
//             { id: 1, name: 'Weighted Pullups', exerciseType: ExerciseType.Strength },
//             { id: 2, name: 'OHP', exerciseType: ExerciseType.Strength },
//             { id: 3, name: 'Dumbbell Rows', exerciseType: ExerciseType.Strength },
//             { id: 4, name: 'Reverse Flyes', exerciseType: ExerciseType.Strength },
//             { id: 5, name: 'Seated Curls', exerciseType: ExerciseType.Strength },
//         ],
//     },
//     {
//         id: 7,
//         workoutName: 'Day 2',
//         exercises: [
//             { id: 1, name: 'Incline Bench Press', exerciseType: ExerciseType.Strength },
//             { id: 2, name: 'Barbell Rows', exerciseType: ExerciseType.Strength },
//             { id: 3, name: 'Dips', exerciseType: ExerciseType.Strength },
//             { id: 4, name: 'Lateral Raises', exerciseType: ExerciseType.Strength },
//             { id: 5, name: 'Tricep Extensions', exerciseType: ExerciseType.Strength },
//         ],
//     },
// ];

interface IProps {

}

interface IState {
    initialWorkoutList: IWorkout[];
    workoutList: IWorkout[];
    sortAscending: boolean;
    input: string;
    showWorkoutModal: boolean;
    newWorkoutExercises: IExercise[];
}

class WorkoutLibraryView extends Component<IProps, IState> {
    private workoutNameInput: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            initialWorkoutList: [],
            workoutList: [],
            sortAscending: true,
            input: '',
            showWorkoutModal: false,
            newWorkoutExercises: [],
        };
        this.workoutNameInput = React.createRef();
    }

    public componentDidMount() {
        fetch('https://localhost:44391/api/workout')
        .then((result) => {
            if (result.ok) {
                return result.json();
            }
        })
        .then((data) => {
            if (!data) {
                return;
            }
            const workoutList: IWorkout[] = [];
            data.map((row: IWorkout) => workoutList.push(row));
            workoutList.sort(this.state.sortAscending ? this.sortAscending('workoutName') : this.sortDescending('workoutName'));

            this.setState({ 
                initialWorkoutList: workoutList,
                workoutList: workoutList
            });
        });
        
    }

    private sortAscending = (column: string) => {
        return (a: any, b: any) => {
            if (a[column].toLowerCase() < b[column].toLowerCase()) return -1;
            if (a[column].toLowerCase() > b[column].toLowerCase()) return 1;
            return 0;
        };
    }

    private sortDescending = (column: string) => {
        return (a: any, b: any) => {
            if (a[column].toLowerCase() > b[column].toLowerCase()) return -1;
            if (a[column].toLowerCase() < b[column].toLowerCase()) return 1;
            return 0;
        };
    }

    private sortBy = (column: string) => {
        const workoutList = this.state.workoutList;
        this.state.sortAscending ? workoutList.sort(this.sortDescending(column)) : workoutList.sort(this.sortAscending(column));
        this.setState({ workoutList, sortAscending: !this.state.sortAscending });
    }

    private search = (event: any) => {
        const input = event.target.value.toLowerCase();
        this.setState({ input });

        const workoutList = this.state.initialWorkoutList.filter(workout =>
            workout.workoutName.toLowerCase().includes(input),
        );
        workoutList.sort(this.state.sortAscending ?
            this.sortAscending('workoutName') :
            this.sortDescending('workoutName'));

        this.setState({ workoutList });
    }

    private handleClose = () => {
        this.setState({ showWorkoutModal: false });
    }

    private handleShow = () => {
        this.setState({ showWorkoutModal: true });
    }

    private addWorkout = () => {
        const newWorkout = this.workoutNameInput.current.value;

        const data = JSON.stringify({
            workoutName: newWorkout,
            exercises: this.state.newWorkoutExercises
        });

        fetch('https://localhost:44391/api/workout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
        })
        .then((result) => {
            if (result.ok) {
                return result.json();
            }
        })
        .then((data) => {
            if (!data) {
                return;
            }
            let workoutList: IWorkout[] = [];
            workoutList.push(data);
            const initialWorkoutList = this.state.initialWorkoutList.concat(workoutList);
            workoutList = this.state.input ?
                initialWorkoutList.filter(workout => workout.workoutName.toLowerCase().includes(this.state.input)) :
                initialWorkoutList;

            workoutList.sort(this.state.sortAscending ? this.sortAscending('workoutName') : this.sortDescending('workoutName'));

            this.setState({ initialWorkoutList, workoutList });
            })
            .catch(() => {
                // Setstate of a show add error modal 
            });

        

        this.handleClose();
    }

    public onChangeWorkoutExercises = (exercise: IExercise) => {
        const newWorkoutExercises = this.state.newWorkoutExercises; 
        newWorkoutExercises.push(exercise);
        this.setState({ newWorkoutExercises });
    }

    public render() {
        return (
            <>
                <WorkoutAddModal
                    showWorkoutModal={this.state.showWorkoutModal}
                    handleClose={this.handleClose}
                    workoutNameInput={this.workoutNameInput}
                    addWorkout={this.addWorkout}
                    onChangeWorkoutExercises={this.onChangeWorkoutExercises}
                    newWorkoutExercises={this.state.newWorkoutExercises}
                />
                <div className="workout-library-container">
                    <SearchAndAddBar
                        handleSearch={(event: any) => this.search(event)}
                        handleShow={this.handleShow}
                    />
                    <WorkoutListTable 
                        workoutList={this.state.workoutList}
                        handleSortClick={this.sortBy}
                        sortAscending={this.state.sortAscending}
                    />
                </div>
            </>
        );
    }
}

export default WorkoutLibraryView;