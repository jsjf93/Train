import { Table } from "react-bootstrap";
import { IWorkoutExercise, IDurationSet } from "../../interfaces";

interface IProps {
  workoutExercise: IWorkoutExercise;
}

const DurationTable = (props: IProps) => {
  const sets = props.workoutExercise.sets as Array<IDurationSet>;

  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Set</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {sets.map(s => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.duration}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};

export default DurationTable;