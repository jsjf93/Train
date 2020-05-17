import { Button } from "react-bootstrap";

interface IProps {
  handleClick: () => void;
  buttonText: string;
}

const AddButton = (props: IProps) => (
  <Button variant="primary" onClick={props.handleClick}>
    {props.buttonText}
  </Button>
);

export default AddButton;