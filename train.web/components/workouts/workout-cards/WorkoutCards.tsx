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
    <CardDeck className={styles.cards__container}>
      {props.workouts.map(w => (
        <Card key={w.id} className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.card__titleContainer}>
              {w.workoutName}
              <Dropdown className={styles.card__menuButton}>
                <Dropdown.Toggle id={`more-options-toggle-${w.id}`} className={styles.dropdownToggle}>
                  <MoreVert />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => props.deleteWorkout(w.id)}>Delete</Dropdown.Item>
                  <Dropdown.Item as="button">
                    <Link href={"/workouts/[id]"} as={`/workouts/${w.id}`}><a>Edit</a></Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Title>
            <Card.Text>
              <span className={styles.info}>Exercises; </span>
              {w.workoutExercises.map(w => w.exerciseName).join(', ')}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </CardDeck>
  )
};

export default WorkoutCards;