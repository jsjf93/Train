import React from 'react';
import { Form, Col } from '../../../../node_modules/react-bootstrap';

interface IProps {

}

const IntervalFields = (props: IProps) => {
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

            <Form.Label className="workout-modal-sub-label">Rest Duration</Form.Label>
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

            <Form.Label className="workout-modal-sub-label">Total Sets</Form.Label>
            <Form.Group>
                <Form.Control type='number'/>
            </Form.Group>
        </div>
    );
}

export default IntervalFields;