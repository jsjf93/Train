import React, { Component } from "react";
import { IWorkout, } from './index';
import { Table } from '../../node_modules/react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './WorkoutListTable.css';
import { MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface IProps {
    workoutList: IWorkout[];
    handleSortClick: (column: string) => void;
    sortAscending: boolean;
    handleShowUpdateModal: (workout: IWorkout) => void;
}

class WorkoutListTable extends Component<IProps> {
    public render() {
        return (
            <div className="workout-list-container">
                <Table striped bordered hover variant='dark' size='sm'>
                    <thead>
                        <tr>
                            <td onClick={() => this.props.handleSortClick('workoutName')}>
                                Name
                                {this.props.sortAscending ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                            </td>
                            <td />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.workoutList.length === 0 &&
                            <tr>
                                <td>No workouts were found</td>
                                <td />
                            </tr>}
                        {this.props.workoutList.map((workout, id) => {
                            return [
                                <tr key={id}>
                                    <td onClick={() => this.props.handleShowUpdateModal(workout)}>
                                        {workout.workoutName}
                                    </td>
                                    <td className='workout-remove-icon-container'>
                                        <MdDelete
                                            className='workout-remove-icon'
                                            size={20}
                                            //onClick={() => this.handleShowRemoveModal(workout)}
                                        />
                                    </td>
                                </tr>,
                            ];
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default WorkoutListTable;