import { CardDeck, Card } from "react-bootstrap";
import { IWorkout } from "../../interfaces";
import styles from "./WorkoutCards.module.scss";
import { useRouter } from "next/router";

interface IProps {
  workouts: IWorkout[];
  deleteWorkout: (workoutId: number) => void;
}

const WorkoutCards = (props: IProps) => {
  const router = useRouter();

  const goToUpdateWorkout = (id: number) => {
    router.push(`/workouts/${id}`);
  };

  return (
    <CardDeck>
      {props.workouts.map(w => (
        <Card key={w.id} className={styles.card} onClick={() => goToUpdateWorkout(w.id)}>
          <Card.Body>
            <Card.Title className={styles.card__titleContainer}>
              {w.workoutName}
              <span className={styles.card__closeButton} onClick={() => props.deleteWorkout(w.id)}>x</span>
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