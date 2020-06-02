import { Table, FormControl, Col } from "react-bootstrap";
import { IWorkoutExercise, IStrengthSet } from "../../interfaces";
import Form from "react-bootstrap/Form";
import { TimeUnit } from "../../enums";

interface IProps {
  workoutExercise: IWorkoutExercise;
  handleChange: (workoutExercise: IWorkoutExercise) => void;
}

const StrengthTable = (props: IProps) => {
  let sets = props.workoutExercise.sets as Array<IStrengthSet>;

  const handleWeightChange = (setId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const index = sets.findIndex(s => s.exerciseSetId === setId);

    if (index !== -1) {
      const input = parseInt(event.target.value);
      const weight = isNaN(input) ? 0 : input;
    
      sets[index].weight = weight;
      
      handleChange();
    }
  };

  const handleRepsChange = (setId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const index = sets.findIndex(s => s.exerciseSetId === setId);

    if (index !== -1) {
      const input = parseInt(event.target.value);
      const reps = isNaN(input) ? 0 : input;
    
      sets[index].reps = reps;

      handleChange();
    }
  };

  const handleDurationChange = (setId: number, event: React.ChangeEvent<HTMLInputElement>, unit: TimeUnit) => {
    const index = sets.findIndex(s => s.exerciseSetId === setId);

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
          <th>Weight (kg)</th>
          <th>Reps</th>
          <th>Duration</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sets.map(s => (
          <tr key={s.exerciseSetId}>
            <td>{s.orderId}</td>
            <td>
              <FormControl 
                type="text" 
                defaultValue={s.weight} 
                size="sm"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleWeightChange(s.exerciseSetId, event)}
              />
            </td>
            <td>
              <FormControl 
                type="text" 
                defaultValue={s.reps} 
                size="sm"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleRepsChange(s.exerciseSetId, event)}
              />
            </td>
            <td>
              <Form.Row>
                <Col>
                  <FormControl 
                    type="text" 
                    defaultValue={s.restDuration?.minutes}
                    size="sm"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleDurationChange(s.exerciseSetId, event, TimeUnit.Minute)}
                    placeholder="Minutes"
                  />
                </Col>
                <Col>
                  <FormControl 
                    type="text"
                    defaultValue={s.restDuration?.seconds}
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
  );
};

export default StrengthTable;