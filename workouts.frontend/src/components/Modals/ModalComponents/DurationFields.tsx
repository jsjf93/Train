import React, { Component } from 'react';
import { Form, Col } from '../../../../node_modules/react-bootstrap';

interface IProps {
    updateExerciseDurationFields: (h: number, m: number, s: number) => void;
}


class DurationFields extends Component<IProps> {
    private hourInput: any;
    private minuteInput: any;
    private secondInput: any;

    constructor(props: IProps) {
        super(props);

        this.hourInput = React.createRef();
        this.minuteInput = React.createRef();
        this.secondInput = React.createRef();
    }

    private updateFields = () => {
        this.props.updateExerciseDurationFields(
            this.hourInput.current.value ? this.hourInput.current.value : 0, 
            this.minuteInput.current.value ? this.minuteInput.current.value : 0, 
            this.secondInput.current.value ? this.secondInput.current.value : 0
        );
    }

    public render() {
        return (
            <div>
                <Form.Label className="workout-modal-sub-label">Exercise Duration</Form.Label>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control 
                            ref={this.hourInput}
                            type='number' 
                            placeholder='Hours' 
                            onChange={this.updateFields}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control 
                            ref={this.minuteInput}
                            type='number' 
                            placeholder='Minutes'
                            onChange={this.updateFields}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control 
                            ref={this.secondInput}
                            type='number' 
                            placeholder='Seconds'
                            onChange={this.updateFields}
                        />
                    </Form.Group>
                </Form.Row>
            </div>
        );
    }
}

export default DurationFields;