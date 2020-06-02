import { Table, Form, Col, FormControl } from "react-bootstrap";
import { IWorkoutExercise, IDurationSet } from "../../interfaces";
import { TimeUnit } from "../../enums";

interface IProps {
  workoutExercise: IWorkoutExercise;
  handleChange: (workoutExercise: IWorkoutExercise) => void;
}

const DurationTable = (props: IProps) => {
  let sets = props.workoutExercise.sets as Array<IDurationSet>;

  const handleDurationChange = (setId: number, event: React.ChangeEvent<HTMLInputElement>, unit: TimeUnit) => {
    const index = sets.findIndex(s => s.exerciseSetId === setId);

    if (index !== -1) {
      const input = parseInt(event.target.value);
      const time = isNaN(input) ? 0 : input;

      if (!sets[index].duration) {
        sets[index].duration = {}
      }
  
      switch(unit) {
        case TimeUnit.Minute:
          sets[index].duration.minutes = time;
          break;
        case TimeUnit.Second:
          sets[index].duration.seconds = time;
          break;
        default:
          break;
      }

      handleChange();
    }
  };

  const handleRemoveSet = (id: number) => {
    if (sets.length > 1) {
      sets = sets.filter(s => s.exerciseSetId !== id);
      sets.forEach((s, i) => s.orderId = (i + 1));
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
          <th>Duration</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sets.map(s => (
          <tr key={s.exerciseSetId || s.reactKey}>
            <td>{s.orderId}</td>
            <td>
              <Form.Row>
                <Col>
                  <FormControl 
                    type="text" 
                    defaultValue={s.duration?.minutes}
                    size="sm"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleDurationChange(s.exerciseSetId, event, TimeUnit.Minute)}
                    placeholder="Minutes"
                  />
                </Col>
                <Col>
                  <FormControl 
                    type="text"
                    defaultValue={s.duration?.seconds}
                    size="sm"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleDurationChange(s.exerciseSetId, event, TimeUnit.Second)}
                    placeholder="Seconds"
                  />
                </Col>
              </Form.Row>
            </td>
            <td onClick={() => handleRemoveSet(s.exerciseSetId)}>x</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};

export default DurationTable;