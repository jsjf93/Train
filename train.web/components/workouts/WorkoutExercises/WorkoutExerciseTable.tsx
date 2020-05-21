import { IWorkoutExercise } from "../../interfaces";
import styles from './WorkoutExerciseTable.module.scss';
import { Table, Row } from "react-bootstrap";
import ExerciseTypeDropdown from "../ExerciseTypeDropdown/ExerciseTypeDropdown";

interface IProps {
  workoutExercise: IWorkoutExercise;
}

const WorkoutExerciseTable = (props: IProps) => (
  <div className={styles.container}>
    <Row>
      <h2>{props.workoutExercise.exerciseName}</h2>
      <ExerciseTypeDropdown />
    </Row>

    <Table>
      <thead>
        <tr>
          <th>Set</th>
          <th>Weight</th>
          <th>Reps</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>10</td>
          <td>5</td>
          <td>1:30</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default WorkoutExerciseTable;