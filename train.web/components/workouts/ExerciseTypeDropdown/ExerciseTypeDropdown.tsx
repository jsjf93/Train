import { DropdownButton, Dropdown } from "react-bootstrap";
import { ExerciseType } from "../../enums";

interface IProps {
  exerciseType?: ExerciseType;
  handleSelect: (type: ExerciseType) => void;
}

const ExerciseTypeDropdown = (props: IProps) => {
  const getTitle = () => {
    switch(props.exerciseType) {
      case ExerciseType.Duration:
        return 'Duration';
      case ExerciseType.Interval:
        return 'Interval';
      case ExerciseType.Strength:
        return 'Strength';
      default:
        return 'Exercise type';
    }
  };

  return ( 
    <DropdownButton 
      id="exercise-type-dropdown" 
      title={getTitle()}
      size="sm"
      onSelect={props.handleSelect}
    >
      <Dropdown.Item eventKey={ExerciseType.Duration.toString()}>Duration</Dropdown.Item>
      <Dropdown.Item eventKey={ExerciseType.Interval.toString()}>Interval</Dropdown.Item>
      <Dropdown.Item eventKey={ExerciseType.Strength.toString()}>Strength</Dropdown.Item>
    </DropdownButton>
  );
};

export default ExerciseTypeDropdown;