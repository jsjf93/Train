import { DropdownButton, Dropdown } from "react-bootstrap";
import { ExerciseType } from "../../enums";

interface IProps {
  exerciseType?: ExerciseType
}

const ExerciseTypeDropdown = (props: IProps) => (
  <DropdownButton 
    id="exercise-type-dropdown" 
    title={props.exerciseType || 'Exercise type'}
    size="sm"
  >
    <Dropdown.Item>Duration</Dropdown.Item>
    <Dropdown.Item>Interval</Dropdown.Item>
    <Dropdown.Item>Strength</Dropdown.Item>
  </DropdownButton>
);

export default ExerciseTypeDropdown;