import React from "react";
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
    handleShowRemoveModal: (workout: IWorkout) => void;
}

const WorkoutListTable = (props: IProps) => {
    return (
        <div className="workout-list-container">
            <Table striped bordered hover variant='dark' size='sm'>
                <thead>
                    <tr>
                        <td onClick={() => props.handleSortClick('workoutName')}>
                            Name
                            {props.sortAscending ? 
                                <MdKeyboardArrowDown className="workout-sort-icon"/> : 
                                <MdKeyboardArrowUp className="workout-sort-icon"/>}
                        </td>
                        <td />
                    </tr>
                </thead>
                <tbody>
                    {props.workoutList.length === 0 &&
                        <tr>
                            <td>No workouts were found</td>
                            <td />
                        </tr>}
                    {props.workoutList.map((workout, id) => {
                        return [
                            <tr key={id}>
                                <td onClick={() => props.handleShowUpdateModal(workout)}>
                                    {workout.workoutName}
                                </td>
                                <td className='workout-remove-icon-container'>
                                    <MdDelete
                                        className='workout-remove-icon'
                                        size={20}
                                        onClick={() => props.handleShowRemoveModal(workout)}
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

export default WorkoutListTable;