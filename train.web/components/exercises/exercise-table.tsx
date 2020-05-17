import { Table } from "react-bootstrap";
import { IExercise } from "../interfaces";

interface IProps {
  exercises: IExercise[];
}

const ExerciseTable = (props: IProps) => (
  <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Body parts used</th>
      </tr>
    </thead>
    <tbody>
      {props.exercises.map(e => (
        <tr key={e.exerciseId}>
          <td>{e.exerciseName}</td>
          <td>{e.bodyPartsUsed.map(b => b.name).join(', ')}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ExerciseTable;