import React, { Component } from 'react';
import { Table } from '../../node_modules/react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { IExercise } from './index';
import './ExerciseListTable.css';
import { MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import ExerciseUpdateModal from './Modals/ExerciseUpdateModal';
import ExerciseRemoveModal from './Modals/ExerciseRemoveModal';

interface IProps {
    exerciseList: IExercise[];
    handleRemoveClick: (id: number) => void;
    handleUpdateClick: (exercise: IExercise) => void;
    exerciseNameInput: any;
    handleSortClick: (column: string) => void;
    sortDirection: string;
}

interface IState {
    exerciseList: IExercise[];
    showExerciseModal: boolean;
    showRemoveExerciseModal: boolean;
    selectedExercise?: IExercise;
    input: string;
}

class ExerciseListTable extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            exerciseList: this.props.exerciseList,
            showExerciseModal: false,
            showRemoveExerciseModal: false,
            selectedExercise: undefined,
            input: '',
        };
    }

    public componentDidUpdate() {
        if (this.state.exerciseList !== this.props.exerciseList) {
            this.setState({ exerciseList: this.props.exerciseList });
        }
    }

    private handleClose = () => {
        this.setState({ showExerciseModal: false});
    }

    private handleShow = (exercise: IExercise) => {
        this.setState({ showExerciseModal: true, selectedExercise: exercise, input: exercise.name});
    }

    private handleCloseRemoveModal = () => {
        this.setState({ showRemoveExerciseModal: false});
    }

    private handleShowRemoveModal = (exercise: IExercise) => {
        this.setState({ showRemoveExerciseModal: true, selectedExercise: exercise, input: exercise.name});
    }

    private handleRemove = () => {
        this.props.handleRemoveClick(this.state.selectedExercise!.id);
        this.handleCloseRemoveModal();
    }

    private handleUpdate = () => {
        this.props.handleUpdateClick(this.state.selectedExercise!);
        this.handleClose();
    }

    private onChangeHandler = (event: any) => {
        const input = event.target.value;
        this.setState({ input });
    }

    public render() {
        return (
            <>
                <ExerciseUpdateModal
                    showExerciseModal={this.state.showExerciseModal}
                    handleClose={this.handleClose}
                    value={this.state.input}
                    exerciseNameInput={this.props.exerciseNameInput}
                    onChangeHandler={this.onChangeHandler}
                    handleUpdate={this.handleUpdate}
                />
                <ExerciseRemoveModal
                    showRemoveExerciseModal={this.state.showRemoveExerciseModal}
                    handleCloseRemoveModal={this.handleCloseRemoveModal}
                    handleRemove={this.handleRemove}
                />

                <Table striped bordered hover variant='dark' size='sm'>
                    <thead>
                        <tr>
                            <td onClick={() => this.props.handleSortClick('name')}>
                                Name
                                {this.props.sortDirection === 'asc' ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                            </td>
                            <td />
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.exerciseList.length === 0 &&
                            <tr>
                                <td>No exercise were found</td>
                                <td />
                            </tr>}
                        {this.state.exerciseList.map((exercise) => {
                            return [
                                <tr key={exercise.id}>
                                    <td onClick={() => this.handleShow(exercise)}>
                                        {exercise.name}
                                    </td>
                                    <td className='exercise-remove-icon-container'>
                                        <MdDelete
                                            className='exercise-remove-icon'
                                            size={20}
                                            onClick={() => this.handleShowRemoveModal(exercise)}
                                        />
                                    </td>
                                </tr>,
                            ];
                        })}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default ExerciseListTable;
