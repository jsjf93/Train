import React from 'react';
import { Form, Col } from '../../../../node_modules/react-bootstrap';

interface IProps {

}

const DurationFields = (props: IProps) => {
    return (
        <div>
            <Form.Label className="workout-modal-sub-label">Exercise Duration</Form.Label>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Control type='number' placeholder='Hours'/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control type='number' placeholder='Minutes'/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control type='number' placeholder='Seconds'/>
                </Form.Group>
            </Form.Row>
        </div>
    );
}

export default DurationFields;