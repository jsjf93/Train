import { Table } from "react-bootstrap";
import { IWorkoutExercise, IStrengthSet } from "../../interfaces";

interface IProps {
  workoutExercise: IWorkoutExercise;
}

const StrengthTable = (props: IProps) => {
  const sets = props.workoutExercise.sets as Array<IStrengthSet>;

  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Set</th>
          <th>Weight</th>
          <th>Reps</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {sets.map(s => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.weight}</td>
            <td>{s.reps}</td>
            <td>{s.restDuration}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StrengthTable;