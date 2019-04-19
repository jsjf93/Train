import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import './ExerciseLibraryView.css'
import { Exercise } from './index';
import ExerciseListTable from './ExerciseListTable';
import ExerciseAddModal from './Modals/ExerciseAddModal';
import SearchAndAddBar from './SearchAndAddBar';

interface IProps {

}

interface IState {
    initialExerciseList: Exercise[];
    exerciseList: Exercise[];
    sortDirection: string;
    input: string;
    showExerciseModal: boolean;
    showExerciseAddError: boolean;
    showExerciseUpdateError: boolean;
    showExerciseRemoveError: boolean;
}

class ExerciseLibraryView extends Component<IProps, IState> {
    private exerciseNameInput: any;
    
    constructor(props: IProps) {
        super(props);
        this.state = {
            initialExerciseList: [],
            exerciseList: [],
            sortDirection: 'asc',
            input: "",
            showExerciseModal: false,
            showExerciseAddError: false,
            showExerciseUpdateError: false,
            showExerciseRemoveError: false
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
            exerciseList.sort(this.state.sortDirection === "asc"?
                this.sortAscending('name') :
                this.sortDescending('name'));

            this.setState({ 
                initialExerciseList: exerciseList,
                exerciseList
            });
            console.log("[ExerciseLibraryView] fetch. ", this.state.initialExerciseList);
        })
    }

    private sortAscending = (column: string) => {
        return function (a: any, b: any) {
            if (a[column].toLowerCase() < b[column].toLowerCase()) return -1;
            if (a[column].toLowerCase() > b[column].toLowerCase()) return 1;
            return 0;
        };
    }

    private sortDescending = (column: string) => {
        return function (a: any, b: any) {
            if (a[column].toLowerCase() > b[column].toLowerCase()) return -1;
            if (a[column].toLowerCase() < b[column].toLowerCase()) return 1;
            return 0;
        };
    }

    private sortBy = (column: string) => {
        const exerciseList = this.state.exerciseList;
        if (this.state.sortDirection === 'desc') {
            exerciseList.sort(this.sortAscending(column));
            this.setState({ exerciseList, sortDirection: 'asc' });
        }
        if (this.state.sortDirection === 'asc') {
            exerciseList.sort(this.sortDescending(column));
            this.setState({ exerciseList, sortDirection: 'desc' });
        }
    }

    private search = (event: any) => {
        const input = event.target.value.toLowerCase();
        this.setState({ input });

        const exerciseList = this.state.initialExerciseList.filter(exercise => 
            exercise.name.toLowerCase().includes(input)
        );
        exerciseList.sort(this.state.sortDirection === "asc" ? this.sortAscending('name') : this.sortDescending('name'));

        this.setState({ exerciseList });
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
            let exerciseList: Exercise[] = [];
            exerciseList.push(data);
            const initialExerciseList = this.state.initialExerciseList.concat(exerciseList);
            exerciseList = this.state.input ?
                initialExerciseList.filter(exercise => exercise.name.toLowerCase().includes(this.state.input)) :
                initialExerciseList;

            exerciseList.sort(this.state.sortDirection === "asc" ? this.sortAscending('name') : this.sortDescending('name'));

            this.setState({ initialExerciseList, exerciseList });
        })
        .catch(err => {
            console.log(err);
            this.setState({ showExerciseAddError: true });
        })
        this.handleClose();
    }

    private handleUpdateClick = (selectedExercise: Exercise) => {
        const updatedExerciseId = selectedExercise.id;
        const updatedExercise = this.exerciseNameInput.current.value;

        fetch('https://localhost:44303/api/exerciselibrary/' + updatedExerciseId , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: updatedExerciseId,
                name: updatedExercise,
                notes: selectedExercise.notes
            })
        })
        .then(result => {
            if (result.ok) {
                let exerciseList: Exercise[] = [];
                exerciseList.push({ id: updatedExerciseId, name: updatedExercise, notes: selectedExercise.notes });

                const initialExerciseList = this.state.initialExerciseList.filter(exercise => exercise.id !== updatedExerciseId);
                initialExerciseList.push(exerciseList[0]);

                exerciseList = this.state.input ?
                    initialExerciseList.filter(exercise => exercise.name.toLowerCase().includes(this.state.input)) :
                    initialExerciseList;
                
                exerciseList.sort(this.state.sortDirection === "asc" ? this.sortAscending('name') : this.sortDescending('name'));

                this.setState({ initialExerciseList, exerciseList});
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({ showExerciseUpdateError: true });
        })
    }

    private handleRemoveClick = (id: number) => {
        fetch('https://localhost:44303/api/exerciselibrary/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(result => {
            if (result.ok) {
                this.setState({ 
                    initialExerciseList: this.state.initialExerciseList.filter(exercise => exercise.id !== id),
                    exerciseList: this.state.exerciseList.filter(exercise => exercise.id !== id)
                });
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({ showExerciseRemoveError: true });
        })
    }

    private hideExerciseAddError = () => {
        this.setState({ showExerciseAddError: false });
    }

    private hideExerciseUpdateError = () => {
        this.setState({ showExerciseUpdateError: false });
    }

    private hideExerciseRemoveError = () => {
        this.setState({ showExerciseRemoveError: false });
    }

    render() {
        return ( 
            <>
                {this.state.showExerciseAddError && 
                    <Alert onClick={this.hideExerciseAddError} variant="danger">
                        Unable to add exercise. <b>Click to dismiss.</b>
                    </Alert>
                }
                {this.state.showExerciseUpdateError && 
                    <Alert onClick={this.hideExerciseUpdateError} variant="danger">
                        Unable to update exercise. <b>Click to dismiss.</b>
                    </Alert>
                }
                {this.state.showExerciseRemoveError && 
                    <Alert onClick={this.hideExerciseRemoveError} variant="danger">
                        Unable to remove exercise. <b>Click to dismiss.</b>
                    </Alert>
                }
                <ExerciseAddModal 
                    showExerciseModal={this.state.showExerciseModal}
                    handleClose={this.handleClose}
                    exerciseNameInput={this.exerciseNameInput}
                    addExercise={this.addExercise}
                />
                <div className="exercise-library-view-container">
                    <SearchAndAddBar 
                        handleSearch={(event: any) => this.search(event)}
                        handleShow={this.handleShow}
                    />
                    <ExerciseListTable 
                        exerciseList={this.state.exerciseList} 
                        handleRemoveClick={this.handleRemoveClick}
                        handleUpdateClick={this.handleUpdateClick}
                        exerciseNameInput={this.exerciseNameInput}
                        handleSortClick={this.sortBy}
                        sortDirection={this.state.sortDirection}
                    />
                </div>
            </>
        )
    }
}

export default ExerciseLibraryView;