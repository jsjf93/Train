import { Table, FormControl, Col } from "react-bootstrap";
import { IWorkoutExercise, IStrengthSet } from "../../interfaces";
import Form from "react-bootstrap/Form";
import { TimeUnit } from "../../enums";
import Delete from '@material-ui/icons/Delete';
import styles from './WorkoutExerciseTable.module.scss';

interface IProps {
  workoutExercise: IWorkoutExercise;
  handleChange: (workoutExercise: IWorkoutExercise) => void;
}

const StrengthTable = (props: IProps) => {
  let sets = props.workoutExercise.sets as Array<IStrengthSet>;

  const handleWeightChange = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const index = sets.findIndex(s => s.exerciseSetId?.toString() === id || s.reactKey === id);

    if (index !== -1) {
      const input = parseInt(event.target.value);
      const weight = isNaN(input) ? 0 : input;
    
      sets[index].weight = weight;
      
      handleChange();
    }
  };

  const handleRepsChange = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const index = sets.findIndex(s => s.exerciseSetId?.toString() === id || s.reactKey === id);

    if (index !== -1) {
      const input = parseInt(event.target.value);
      const reps = isNaN(input) ? 0 : input;
    
      sets[index].reps = reps;

      handleChange();
    }
  };

  const handleDurationChange = (id: string, event: React.ChangeEvent<HTMLInputElement>, unit: TimeUnit) => {
    const index = sets.findIndex(s => s.exerciseSetId?.toString() === id || s.reactKey === id);

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

  const handleRemoveSet = (id: string) => {
    if (sets.length > 1) {
      sets = sets.filter(s => s.exerciseSetId?.toString() !== id && s.reactKey !== id);
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
        {sets.map(s => {
          const id = (s.exerciseSetId || s.reactKey).toString();

          return (
            <tr key={id}>
              <td>{s.orderId}</td>
              <td>
                <FormControl 
                  type="text" 
                  defaultValue={s.weight} 
                  size="sm"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleWeightChange(id, event)}
                />
              </td>
              <td>
                <FormControl 
                  type="text" 
                  defaultValue={s.reps} 
                  size="sm"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleRepsChange(id, event)}
                />
              </td>
              <td>
                <Form.Row>
                  <Col>
                    <FormControl 
                      type="text" 
                      defaultValue={s.restDuration?.minutes}
                      size="sm"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleDurationChange(id, event, TimeUnit.Minute)}
                      placeholder="Minutes"
                    />
                  </Col>
                  <Col>
                    <FormControl 
                      type="text"
                      defaultValue={s.restDuration?.seconds}
                      size="sm"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleDurationChange(id, event, TimeUnit.Second)}
                      placeholder="Seconds"
                    />
                  </Col>
                </Form.Row>
              </td>
              <td className={styles.deleteButton} onClick={() => handleRemoveSet(id)}>
                <Delete />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StrengthTable;