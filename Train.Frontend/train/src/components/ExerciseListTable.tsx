import React, { Component } from 'react';
import { Table } from '../../node_modules/react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Exercise } from './index';

interface IProps {
    exerciseList: Exercise[];
}

interface IState {
    exerciseList: Exercise[];
    sortDirection: string;
}

class ExerciseListTable extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            exerciseList: [],
            sortDirection: 'asc'
        }
    }

    componentDidUpdate() {
        if (this.state.exerciseList !== this.props.exerciseList) {
            this.setState({exerciseList: this.props.exerciseList.sort(this.sortAscending('name'))})
        }
    }

    private sortAscending = (column: string) => {
        return function (a: any, b: any) {
            if (a[column] < b[column]) return -1;
            if (a[column] > b[column]) return 1;
            return 0;
        };
    }

    private sortDescending = (column: string) => {
        return function (a: any, b: any) {
            if (a[column] > b[column]) return -1;
            if (a[column] < b[column]) return 1;
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
    
    render() {
        return (
            <Table striped bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                        <td onClick={() => this.sortBy('name')}>Name</td>
                        <td onClick={() => this.sortBy('notes')}>Notes</td>                            
                    </tr>
                </thead>
                <tbody>
                    {this.state.exerciseList.map(exercise => {
                        return [
                            <tr key={exercise.id}>
                                <td>{exercise.name}</td>
                                <td>{exercise.notes}</td>
                            </tr>
                        ]
                    })}
                </tbody>
            </Table>
        );
    }
}

export default ExerciseListTable;