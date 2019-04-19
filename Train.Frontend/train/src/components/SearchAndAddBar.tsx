import React from 'react';
import { Form, Button } from '../../node_modules/react-bootstrap';

import './SearchAndAddBar.css'

interface IProps {
    handleSearch: (event: any) => void;
    handleShow: () => void;
}

const SearchAndAddBar = (props: IProps) => {
    return (
        <div className="exercise-library-search-add-container">
            <Form className="exercise-library-search">
                <Form.Group>
                    <Form.Control 
                        type="text" 
                        placeholder="Search exercises" 
                        onChange={props.handleSearch}
                    />
                </Form.Group>
            </Form>
            <Button 
                className="exercise-library-add-button"
                variant="success"
                onClick={props.handleShow}
            >
                Add
            </Button>
        </div>
    );
}

export default SearchAndAddBar;