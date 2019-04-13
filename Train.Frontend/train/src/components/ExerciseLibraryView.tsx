import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';

const data = [
    { id: 1, name: "Running" }, 
    { id: 2, name: "Bicep Curls" }, 
    { id: 3, name: "Box Jumps" }
];

function ExerciseLibraryView() {
    return ( 
        <BootstrapTable data={ data }>
            <TableHeaderColumn 
                dataField='name' 
                isKey={true} 
                dataSort={ true }
            >
                Name
            </TableHeaderColumn>
        </BootstrapTable>
    )
}

export default ExerciseLibraryView;