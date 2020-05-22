import { DropdownButton, Dropdown } from "react-bootstrap";
import { ExerciseType } from "../../enums";

interface IProps {
  exerciseType?: ExerciseType;
  handleSelect: (type: ExerciseType) => void;
}

const ExerciseTypeDropdown = (props: IProps) => (
  <DropdownButton 
    id="exercise-type-dropdown" 
    title={props.exerciseType || 'Exercise type'}
    size="sm"
    onSelect={props.handleSelect}
  >
    <Dropdown.Item eventKey={ExerciseType.Duration}>Duration</Dropdown.Item>
    <Dropdown.Item eventKey={ExerciseType.Interval}>Interval</Dropdown.Item>
    <Dropdown.Item eventKey={ExerciseType.Strength}>Strength</Dropdown.Item>
  </DropdownButton>
);

export default ExerciseTypeDropdown;