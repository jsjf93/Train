import React, { Component } from 'react';
import { Form, Col } from '../../../../node_modules/react-bootstrap';

interface IProps {
    updateRestDurationFields: (h: number, m: number, s: number) => void;
    updateSetsField: (s: number) => void;
    updateRepsField: (r: number) => void;
}

class StrengthFields extends Component<IProps> {
    private restDurationHourInput: any;
    private restDurationMinuteInput: any;
    private restDurationSecondInput: any;

    constructor(props: IProps) {
        super(props);

        this.restDurationHourInput = React.createRef();
        this.restDurationMinuteInput = React.createRef();
        this.restDurationSecondInput = React.createRef();
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
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label className="workout-modal-sub-label">Reps</Form.Label>
                        <Form.Control 
                            type='number'
                            onChange={(event: any) => this.props.updateRepsField(event.target.value)}
                        />
                    </Form.Group>
    
                    <Form.Group as={Col}>
                        <Form.Label className="workout-modal-sub-label">Sets</Form.Label>
                        <Form.Control 
                            type='number'
                            onChange={(event: any) => this.props.updateSetsField(event.target.value)}
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
                
            </div>
        );
    }
}

export default StrengthFields;