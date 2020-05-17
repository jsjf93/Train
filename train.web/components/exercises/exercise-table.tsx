import { Table } from "react-bootstrap";
import { IExercise } from "../interfaces";

interface IProps {
  exercises: IExercise[];
  handleClick: (exercise: IExercise) => void;
}

const ExerciseTable = (props: IProps) => {
  const exercises = props.exercises.sort((a, b) => a.exerciseName > b.exerciseName ? 1 : -1);

  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Body parts used</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map(e => (
          <tr 
            key={e.exerciseId}
            onClick={() => props.handleClick(e)}
          >
            <td>{e.exerciseName}</td>
            <td>{e.bodyPartsUsed.map(b => b.bodyPartName).join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExerciseTable;