import React from 'react';
import { Form, Col } from '../../../../node_modules/react-bootstrap';
import { Component } from 'react';

interface IProps {
    updateExerciseDurationFields: (h: number, m: number, s: number) => void;
    updateRestDurationFields: (h: number, m: number, s: number) => void;
    updateSetsField: (s: number) => void;
}

class IntervalFields extends Component<IProps> {
    private exDurationHourInput: any;
    private exDurationMinuteInput: any;
    private exDurationSecondInput: any;
    private restDurationHourInput: any;
    private restDurationMinuteInput: any;
    private restDurationSecondInput: any;

    constructor(props: IProps) {
        super(props);

        this.exDurationHourInput = React.createRef();
        this.exDurationMinuteInput = React.createRef();
        this.exDurationSecondInput = React.createRef();
        this.restDurationHourInput = React.createRef();
        this.restDurationMinuteInput = React.createRef();
        this.restDurationSecondInput = React.createRef();
    }

    private updateExerciseDuration = () => {
        this.props.updateExerciseDurationFields(
            this.exDurationHourInput.current.value ? this.exDurationHourInput.current.value : 0, 
            this.exDurationMinuteInput.current.value ? this.exDurationMinuteInput.current.value : 0, 
            this.exDurationSecondInput.current.value ? this.exDurationSecondInput.current.value : 0
        );
    }

    private updateRestDuration = () => {
        this.props.updateRestDurationFields(
            this.restDurationHourInput.current.value ? this.restDurationHourInput.current.value : 0, 
            this.restDurationMinuteInput.current.value ? this.restDurationMinuteInput.current.value : 0, 
            this.restDurationSecondInput.current.value ? this.restDurationSecondInput.current.value : 0
        );
    }

    public render() {
        return (
            <div>
                <Form.Label className="workout-modal-sub-label">Exercise Duration</Form.Label>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control 
                            ref={this.exDurationHourInput}
                            type='number' 
                            placeholder='Hours'
                            onChange={this.updateExerciseDuration}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control 
                            ref={this.exDurationMinuteInput}
                            type='number' 
                            placeholder='Minutes'
                            onChange={this.updateExerciseDuration}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control 
                            ref={this.exDurationSecondInput}
                            type='number' 
                            placeholder='Seconds'
                            onChange={this.updateExerciseDuration}
                        />
                    </Form.Group>
                </Form.Row>
    
                <Form.Label className="workout-modal-sub-label">Rest Duration</Form.Label>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control 
                            ref={this.restDurationHourInput}
                            type='number' 
                            placeholder='Hours'
                            onChange={this.updateRestDuration}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control 
                            ref={this.restDurationMinuteInput}
                            type='number' 
                            placeholder='Minutes'
                            onChange={this.updateRestDuration}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control 
                            ref={this.restDurationSecondInput}
                            type='number' 
                            placeholder='Seconds'
                            onChange={this.updateRestDuration}
                        />
                    </Form.Group>
                </Form.Row>
    
                <Form.Label className="workout-modal-sub-label">Total Sets</Form.Label>
                <Form.Group>
                    <Form.Control 
                        type='number' 
                        onChange={(event: any) => this.props.updateSetsField(event.target.value)}
                    />
                </Form.Group>
            </div>
        );
    }
}

export default IntervalFields;