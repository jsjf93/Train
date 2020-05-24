import { Table, FormControl, Col, Form } from "react-bootstrap";
import { IWorkoutExercise, IIntervalSet } from "../../interfaces";
import { TimeUnit } from "../../enums";

interface IProps {
  workoutExercise: IWorkoutExercise;
  handleChange: (workoutExercise: IWorkoutExercise) => void;
}

const IntervalTable = (props: IProps) => {
  let sets = props.workoutExercise.sets as Array<IIntervalSet>;

  const handleWeightChange = (setId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const index = sets.findIndex(s => s.id === setId);

    if (index !== -1) {
      const input = parseInt(event.target.value);
      const weight = isNaN(input) ? 0 : input;
    
      sets[index].weight = weight;
      
      handleChange();
    }
  };

  const handleExerciseDurationChange = (setId: number, event: React.ChangeEvent<HTMLInputElement>, unit: TimeUnit) => {
    const index = sets.findIndex(s => s.id === setId);

    if (index !== -1) {
      const input = parseInt(event.target.value);
      const time = isNaN(input) ? 0 : input;

      if (!sets[index].exerciseDuration) {
        sets[index].exerciseDuration = {}
      }
  
      switch(unit) {
        case TimeUnit.Minute:
          sets[index].exerciseDuration.minutes = time;
          break;
        case TimeUnit.Second:
          sets[index].exerciseDuration.seconds = time;
          break;
        default:
          break;
      }

      handleChange();
    }
  };

  const handleRestDurationChange = (setId: number, event: React.ChangeEvent<HTMLInputElement>, unit: TimeUnit) => {
    const index = sets.findIndex(s => s.id === setId);

    if (index !== -1) {
      const input = parseInt(event.target.value);
      const time = isNaN(input) ? 0 : input;

      if (!sets[index].restDuration) {
        sets[index].restDuration = {}
      }
  
      switch(unit) {
        case TimeUnit.Minute:
          sets[index].restDuration.minutes = time;
          break;
        case TimeUnit.Second:
          sets[index].restDuration.seconds = time;
          break;
        default:
          break;
      }

      handleChange();
    }
  };

  const handleRemoveSet = (id: number) => {
    if (sets.length > 1) {
      sets = sets.filter(s => s.id !== id);
      handleChange();
    }
  };

  const handleChange = () => {
    const exercise = props.workoutExercise;
    exercise.sets = sets;
    props.handleChange(exercise);
  };

  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Set</th>
          <th>Weight</th>
          <th>Exercise Duration</th>
          <th>Rest</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sets.map((s, i) => (
          <tr key={s.id}>
            <td>{i + 1}</td>
            <td>
              <FormControl 
                type="text" 
                defaultValue={s.weight} 
                size="sm"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleWeightChange(s.id, event)}
              />
            </td>
            <td>
              <Form.Row>
                <Col>
                  <FormControl 
                    type="text" 
                    defaultValue={s.exerciseDuration?.minutes}
                    size="sm"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleExerciseDurationChange(s.id, event, TimeUnit.Minute)}
                    placeholder="Minutes"
                  />
                </Col>
                <Col>
                  <FormControl 
                    type="text"
                    defaultValue={s.exerciseDuration?.seconds}
                    size="sm"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleExerciseDurationChange(s.id, event, TimeUnit.Second)}
                    placeholder="Seconds"
                  />
                </Col>
              </Form.Row>
            </td>
            <td>
              <Form.Row>
                <Col>
                  <FormControl 
                    type="text" 
                    defaultValue={s.restDuration?.minutes}
                    size="sm"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleRestDurationChange(s.id, event, TimeUnit.Minute)}
                    placeholder="Minutes"
                  />
                </Col>
                <Col>
                  <FormControl 
                    type="text"
                    defaultValue={s.restDuration?.seconds}
                    size="sm"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleRestDurationChange(s.id, event, TimeUnit.Second)}
                    placeholder="Seconds"
                  />
                </Col>
              </Form.Row>
            </td>
            <td onClick={() => handleRemoveSet(s.id)}>x</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};

export default IntervalTable;