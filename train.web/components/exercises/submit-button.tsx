import { Button } from "react-bootstrap";

interface IProps {
  handleClick: () => void;
  buttonText: string;
}

const SubmitButton = (props: IProps) => (
  <Button variant="primary" onClick={props.handleClick}>
    {props.buttonText}
  </Button>
);

export default SubmitButton;