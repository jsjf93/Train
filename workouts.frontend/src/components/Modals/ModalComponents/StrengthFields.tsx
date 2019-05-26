import React from 'react';
import { Form, Col } from '../../../../node_modules/react-bootstrap';

interface IProps {

}

const StrengthFields = (props: IProps) => {
    return (
        <div>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label className="workout-modal-sub-label">Reps</Form.Label>
                    <Form.Control type='number'/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label className="workout-modal-sub-label">Sets</Form.Label>
                    <Form.Control type='number'/>
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
            
        </div>
    );
}

export default StrengthFields;