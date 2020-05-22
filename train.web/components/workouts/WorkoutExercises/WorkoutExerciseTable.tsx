import { IWorkoutExercise } from "../../interfaces";
import styles from './WorkoutExerciseTable.module.scss';
import { Table, Row, Button } from "react-bootstrap";
import ExerciseTypeDropdown from "../ExerciseTypeDropdown/ExerciseTypeDropdown";
import StrengthTable from "./StrengthTable";
import { ExerciseType } from "../../enums";
import DurationTable from "./DurationTable";
import IntervalTable from "./IntervalTable";

interface IProps {
  workoutExercise: IWorkoutExercise;
  handleChange: (workoutExercise: IWorkoutExercise) => void;
}

const WorkoutExerciseTable = (props: IProps) => {

  const handleSelect = (type: ExerciseType) => {
    const exercise = props.workoutExercise;
    exercise.exerciseType = type;

    props.handleChange(exercise);
  };

  const renderTable = (workoutExercise: IWorkoutExercise) => {
    switch(workoutExercise.exerciseType) {
      case ExerciseType.Duration:
        return <DurationTable />;
      case ExerciseType.Interval:
        return <IntervalTable />;
      case ExerciseType.Strength:
        return <StrengthTable />;
      default:
        return <div>Pick an exercise type</div>;
    }
  };

  return (
    <div className={styles.container}>
      <Row className={styles.row}>
        <h2>{props.workoutExercise.exerciseName}</h2>
        <ExerciseTypeDropdown exerciseType={props.workoutExercise.exerciseType} handleSelect={handleSelect}/>
      </Row>

      {renderTable(props.workoutExercise)}

      <Button size="sm">Add Set</Button>
    </div>
  );
};

export default WorkoutExerciseTable;