import { IWorkoutExercise, IDurationSet, IIntervalSet, IStrengthSet } from "../../interfaces";
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
  removeWorkoutExercise: (workoutExercise: IWorkoutExercise) => void;
}

const WorkoutExerciseTable = (props: IProps) => {

  const handleSelect = (exerciseType: ExerciseType) => {
    const exercise = props.workoutExercise;
    exercise.exerciseType = Number(exerciseType);

    exercise.sets = [{ id: 1, orderId: 1, exerciseType }];

    props.handleChange(exercise);
  };

  const handleAddSet = () => {
    const exercise = props.workoutExercise;
    const id = Math.max(...(exercise.sets as Array<IDurationSet | IIntervalSet | IStrengthSet>).map(s => s.id)) + 1;
    const orderId = Math.max(...(exercise.sets as Array<IDurationSet | IIntervalSet | IStrengthSet>).map(s => s.orderId)) + 1;

    exercise.sets.push({ id, orderId, restDuration: {}, exerciseType: exercise.exerciseType });
    
    props.handleChange(exercise);
  };

  const renderTable = (workoutExercise: IWorkoutExercise) => {
    switch(workoutExercise.exerciseType) {
      case ExerciseType.Duration:
        return <DurationTable workoutExercise={workoutExercise} handleChange={props.handleChange} />;
      case ExerciseType.Interval:
        return <IntervalTable workoutExercise={workoutExercise} handleChange={props.handleChange} />;
      case ExerciseType.Strength:
        return <StrengthTable workoutExercise={workoutExercise} handleChange={props.handleChange} />;
      default:
        return <div>Pick an exercise type</div>;
    }
  };

  return (
    <div className={styles.container}>
      <Row className={styles.row}>
        <h2>{props.workoutExercise.exerciseName}</h2>
        <ExerciseTypeDropdown exerciseType={props.workoutExercise.exerciseType} handleSelect={handleSelect}/>
        <span className={styles.removeWorkoutExerciseButton} onClick={() => props.removeWorkoutExercise(props.workoutExercise)}>
          x
        </span>
      </Row>

      {renderTable(props.workoutExercise)}

      {props.workoutExercise.exerciseType !== null && props.workoutExercise.exerciseType !== undefined &&
        <Button onClick={handleAddSet} size="sm">Add Set</Button>}
    </div>
  );
};

export default WorkoutExerciseTable;