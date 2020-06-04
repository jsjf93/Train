import React, { Component } from 'react';
import { Form, Button, Modal, Col, ListGroup } from '../../../node_modules/react-bootstrap';

import './WorkoutAddModal.css';
import { IExercise, IDuration } from '../index';
import AutoSuggest from './AutoSuggest';
import DurationFields from './ModalComponents/DurationFields';
import IntervalFields from './ModalComponents/IntervalFields';
import StrengthFields from './ModalComponents/StrengthFields';

const exerciseTypes = {
  0: 'Duration',
  1: 'Interval',
  2: 'Strength'
};

interface IProps {
  showWorkoutModal: boolean;
  handleClose: () => void;
  workoutNameInput: () => void;
  addWorkout: () => void;
  onChangeWorkoutExercises: (exercises: IExercise) => void;
  newWorkoutExercises: IExercise[];
  exerciseNameList: string[];
  updateExerciseNameList: (exerciseName: string) => void;
}

interface IState {
  exerciseNameInput: string;
  exerciseType: string;
  exerciseDuration?: IDuration;
  restDuration?: IDuration;
  reps?: number;
  sets?: number;
  showAutoSuggest: boolean;
}

class WorkoutAddModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      exerciseNameInput: '',
      exerciseType: 'Duration',
      showAutoSuggest: false,
    };
  }

  private formatDuration(duration: IDuration | undefined) {
    return duration ? (duration.hours + ":" + duration.minutes + ":" + duration.seconds) : "";
  }

  private addExercise = () => {
    const exerciseType = Object.values(exerciseTypes).indexOf(this.state.exerciseType);
    this.props.onChangeWorkoutExercises({
      exerciseName: this.state.exerciseNameInput,
      exerciseType,
      exerciseDuration: this.formatDuration(this.state.exerciseDuration),
      restDuration: this.formatDuration(this.state.restDuration),
      sets: this.state.sets,
      reps: this.state.reps,
    });

    if (!this.props.exerciseNameList.includes(this.state.exerciseNameInput)) {
      fetch('https://localhost:44303/api/exerciselibrary', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.exerciseNameInput,
          notes: 'test',
        }),
      })
        .then((result) => {
          if (result.ok) {
            return result.json();
          }
        })
        .then((data) => {
          if (!data) {
            return;
          }
          this.props.updateExerciseNameList(data.name);
        })
        .catch(() => {
          //this.setState({ showExerciseAddError: true });
        });
    }

    this.resetExerciseFields();
  }

  private onChangeExerciseNameField(exerciseNameInput: string) {
    this.setState({ exerciseNameInput });
  }

  private onChangeExerciseType(exerciseType: string) {
    this.setState({ exerciseType });
  }

  private resetExerciseFields() {
    this.setState({
      exerciseNameInput: '',
      exerciseType: 'Duration'
    });
  }

  private autoSuggestItemSelect = (exerciseName: string) => {
    this.onChangeExerciseNameField(exerciseName);

    this.setState({ showAutoSuggest: false })
  }

  private updateExerciseDurationFields = (hours: number, minutes: number, seconds: number) => {
    this.setState({ exerciseDuration: { hours, minutes, seconds } });
  }

  private updateRestDurationFields = (hours: number, minutes: number, seconds: number) => {
    this.setState({ restDuration: { hours, minutes, seconds } });
  }

  private updateSetsField = (sets: number) => {
    this.setState({ sets });
  }

  private updateRepsField = (reps: number) => {
    this.setState({ reps });
  }

  public render() {
    let autoSuggestExerciseNameList: string[] = [];
    if (this.state.exerciseNameInput.length >= 1) {
      autoSuggestExerciseNameList = this.props.exerciseNameList.filter(e =>
        e.toLowerCase().includes(this.state.exerciseNameInput.toLowerCase()));
    }

    return (
      <div className="workout-add-modal-container">
        <Modal show={this.props.showWorkoutModal} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Workout Name</Form.Label>
                <Form.Control
                  type='text'
                  ref={this.props.workoutNameInput}
                />
              </Form.Group>

              <hr />

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="workout-modal-sub-label">Exercise Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder="Exercise name"
                    value={this.state.exerciseNameInput}
                    onChange={(event: any) => this.onChangeExerciseNameField(event.target.value)}
                    onFocus={() => this.setState({ showAutoSuggest: true })}
                    // setTimeout used to get around issue where onBlur was called before AutoSuggest
                    // could select an item
                    onBlur={() => setTimeout(() => this.setState({ showAutoSuggest: false }), 100)}
                  />
                  {this.state.showAutoSuggest && <AutoSuggest
                    exerciseNameList={autoSuggestExerciseNameList}
                    onItemSelect={this.autoSuggestItemSelect}
                  />}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label className="workout-modal-sub-label">Exercise Type</Form.Label>
                  <Form.Control as="select" value={this.state.exerciseType} onChange={(event: any) => this.onChangeExerciseType(event.target.value)}>
                    {Object.values(exerciseTypes).map((type, id) => <option key={id}>{type}</option>)}
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              {this.state.exerciseType === 'Duration' &&
                <DurationFields
                  updateExerciseDurationFields={this.updateExerciseDurationFields}
                />}
              {this.state.exerciseType === 'Interval' &&
                <IntervalFields
                  updateExerciseDurationFields={this.updateExerciseDurationFields}
                  updateRestDurationFields={this.updateRestDurationFields}
                  updateSetsField={this.updateSetsField}
                />}
              {this.state.exerciseType === 'Strength' &&
                <StrengthFields
                  updateRestDurationFields={this.updateRestDurationFields}
                  updateSetsField={this.updateSetsField}
                  updateRepsField={this.updateRepsField}
                />}

              <div className="workout-modal-add-exercise-button-container">
                <Button
                  className={'workout-modal-add-button'}
                  variant="success"
                  onClick={this.addExercise}
                >
                  Add
                </Button>
              </div>
            </Form>

            <hr />

            <Form.Label>Exercises</Form.Label>
            <ListGroup>
              {this.props.newWorkoutExercises.length === 0 ?
                <ListGroup.Item className="workout-add-modal-list-item">
                  No exercises added yet
                </ListGroup.Item> :
                this.props.newWorkoutExercises.map((exercise, id) =>
                  <ListGroup.Item key={id} className="workout-add-modal-list-item">{exercise.exerciseName}</ListGroup.Item>
                )}
            </ListGroup>

            <hr />
            <Button
              className="workout-modal-add-button"
              variant='success'
              type='submit'
              onClick={this.props.addWorkout}
            >
              Add Workout
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default WorkoutAddModal;
