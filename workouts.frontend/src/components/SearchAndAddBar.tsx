import React from 'react';
import { Form, Button } from '../../node_modules/react-bootstrap';

import './SearchAndAddBar.css';

interface IProps {
    handleSearch: (event: any) => void;
    handleShow: () => void;
}

const SearchAndAddBar = (props: IProps) => {
    return (
        <div className='search-add-container'>
            <Button
                className='workout-library-add-button'
                variant='success'
                onClick={props.handleShow}
            >
                Add
            </Button>
            <Form className='workout-library-search'>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Search workouts'
                        onChange={props.handleSearch}
                    />
                </Form.Group>
            </Form>
        </div>
    );
};

export default SearchAndAddBar;
