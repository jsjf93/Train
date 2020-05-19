import { CardDeck, Card } from "react-bootstrap";
import { IWorkout } from "../../interfaces";
import styles from "./WorkoutCards.module.scss";

interface IProps {
  workouts: IWorkout[];
}

const WorkoutCards = (props: IProps) => (
  <CardDeck>
    {props.workouts.map(w => (
      <Card key={w.id} className={styles.card}>
        <Card.Body>
          <Card.Title>{w.workoutName}</Card.Title>
          <Card.Text>
            <span className={styles.info}>Exercises; </span>
            {w.workoutExercises.map(w => w.exerciseName).join(', ')}
          </Card.Text>
        </Card.Body>
      </Card>
    ))}
  </CardDeck>
);

export default WorkoutCards;