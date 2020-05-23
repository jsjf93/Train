import { Table } from "react-bootstrap";
import { IWorkoutExercise, IIntervalSet } from "../../interfaces";

interface IProps {
  workoutExercise: IWorkoutExercise;
}

const IntervalTable = (props: IProps) => {
  const sets = props.workoutExercise.sets as Array<IIntervalSet>;

  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Set</th>
          <th>Weight</th>
          <th>Exercise Duration</th>
          <th>Rest</th>
        </tr>
      </thead>
      <tbody>
        {sets.map(s => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.weight}</td>
            <td>{s.exerciseDuration}</td>
            <td>{s.restDuration}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};

export default IntervalTable;