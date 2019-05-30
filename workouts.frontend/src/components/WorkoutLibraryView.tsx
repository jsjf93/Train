import React, { Component } from 'react';
import { IWorkout, IExercise } from './index';
import WorkoutListTable from './WorkoutListTable';
import SearchAndAddBar from './SearchAndAddBar';
import WorkoutAddModal from './Modals/WorkoutAddModal';
import WorkoutUpdateModal from './Modals/WorkoutUpdateModal';

interface IExerciseApiResult {
    id: number;
    name: string;
    notes: string;
}

interface IProps {

}

interface IState {
    initialWorkoutList: IWorkout[];
    workoutList: IWorkout[];
    sortAscending: boolean;
    input: string;
    showWorkoutModal: boolean;
    newWorkoutExercises: IExercise[];
    exerciseNameList: string[];
    showUpdateWorkoutModal: boolean;
    selectedWorkout?: IWorkout;
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
            exerciseNameList: [],
            showUpdateWorkoutModal: false,
        };
        this.workoutNameInput = React.createRef();
    }

    public componentDidMount() {
        this.fetchWorkouts();
        this.fetchExercises();
    }

    private fetchWorkouts() {
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
            workoutList.sort(this.state.sortAscending ? 
                this.sortAscending('workoutName') : 
                this.sortDescending('workoutName'));

            this.setState({ 
                initialWorkoutList: workoutList,
                workoutList: workoutList
            });
        });
    }

    private fetchExercises() {
        fetch('https://localhost:44303/api/exerciselibrary')
        .then((result) => {
            if (result.ok) {
                return result.json();
            }
        })
        .then((data) => {
            if (!data) {
                return;
            }
            const exerciseNameList: string[] = [];
            data.map((row: IExerciseApiResult) => exerciseNameList.push(row.name));
            exerciseNameList.sort();

            this.setState({ exerciseNameList });
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
        const newWorkoutName = this.workoutNameInput.current.value;

        const data = JSON.stringify({
            workoutName: newWorkoutName,
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

        this.setState({ newWorkoutExercises: [] });

        this.handleClose();
    }

    public onChangeWorkoutExercises = (exercise: IExercise) => {
        const newWorkoutExercises = this.state.newWorkoutExercises; 
        newWorkoutExercises.push(exercise);
        this.setState({ newWorkoutExercises });
    }

    public updateExerciseNameList = (exerciseName: string) => {
        const { exerciseNameList } = this.state;
        exerciseNameList.push(exerciseName);
        this.setState({ exerciseNameList });
    }

    public updateWorkout = (id: number) => {
        const workoutName = this.workoutNameInput.current.value;

        const data = JSON.stringify({
            id,
            workoutName,
            exercises: this.state.newWorkoutExercises
        });
        
        fetch('https://localhost:44391/api/workout/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
        })
        .then((result) => {
            if (result.ok) {
                let workoutList: IWorkout[] = [];
                workoutList.push({ id, workoutName, exercises: this.state.newWorkoutExercises });

                const initialWorkoutList = this.state.initialWorkoutList.filter(w => w.id !== id);
                initialWorkoutList.push(workoutList[0]);

                workoutList = this.state.input ?
                    initialWorkoutList.filter(w => w.workoutName.toLowerCase().includes(this.state.input)) :
                    initialWorkoutList;

                workoutList.sort(this.state.sortAscending ? 
                    this.sortAscending('workoutName') : 
                    this.sortDescending('workoutName'));

                this.setState({ initialWorkoutList, workoutList, showUpdateWorkoutModal: false});
            }
        })
        .catch(() => {
            // Setstate of a show add error modal 
        });

        this.setState({ newWorkoutExercises: [] });
    }

    private handleUpdateModalClose = () => {
        this.setState({ showUpdateWorkoutModal: false });
    }

    private handleUpdateModalShow = (workout: IWorkout) => {
        this.setState({ showUpdateWorkoutModal: true, selectedWorkout: workout });
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
                    exerciseNameList={this.state.exerciseNameList}
                    updateExerciseNameList={this.updateExerciseNameList}
                />
                <WorkoutUpdateModal 
                    showWorkoutModal={this.state.showUpdateWorkoutModal}
                    handleClose={this.handleUpdateModalClose}
                    workout={this.state.selectedWorkout!}
                    workoutNameInput={this.workoutNameInput}
                    exerciseNameList={this.state.exerciseNameList}
                    onChangeWorkoutExercises={this.onChangeWorkoutExercises}
                    updateExerciseNameList={this.updateExerciseNameList}
                    updateWorkout={this.updateWorkout}
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
                        handleShowUpdateModal={this.handleUpdateModalShow}
                    />
                </div>
            </>
        );
    }
}

export default WorkoutLibraryView;