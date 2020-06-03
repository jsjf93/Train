import { CardDeck, Card, Dropdown } from "react-bootstrap";
import { IWorkout } from "../../interfaces";
import styles from "./WorkoutCards.module.scss";
import Link from "next/link";
import MoreVert from '@material-ui/icons/MoreVert';

interface IProps {
  workouts: IWorkout[];
  deleteWorkout: (workoutId: number) => void;
}

const WorkoutCards = (props: IProps) => {
  return (
    <CardDeck>
      {props.workouts.map(w => (
        <Link key={w.id} href={"/workouts/[id]"} as={`/workouts/${w.id}`}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title className={styles.card__titleContainer}>
                {w.workoutName}
                <span className={styles.card__closeButton} onClick={() => props.deleteWorkout(w.id)}>
                  <MoreVert />
                </span>
                <Dropdown>
                  <Dropdown.Toggle id={`more-options-toggle-${w.id}`} className={styles.dropdownToggle}>
                    <MoreVert />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Delete</Dropdown.Item>
                    <Dropdown.Item>Edit</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Title>
              <Card.Text>
                <span className={styles.info}>Exercises; </span>
                {w.workoutExercises.map(w => w.exerciseName).join(', ')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </CardDeck>
  )
};

export default WorkoutCards;