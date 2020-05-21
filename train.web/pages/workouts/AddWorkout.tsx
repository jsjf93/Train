import Layout from "../../components/layout";
import NavBar from "../../components/navbar/Navbar";
import { FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { IWorkoutExercise, IExercise } from "../../components/interfaces";
import AddWorkoutExerciseModal from "../../components/modals/AddWorkoutExerciseModal";
import { GetServerSideProps } from "next";
import styles from '../../styles/AddWorkout.module.scss';
import WorkoutExerciseTable from "../../components/workouts/WorkoutExercises/WorkoutExerciseTable";

interface IProps {
  exercises: IExercise[];
}

export default function AddWorkout(props: IProps) {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<IWorkoutExercise[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (exercise: IExercise) => {
    setWorkoutExercises(workoutExercises.concat({ ...exercise }));
    setShowModal(false);
  };

  return (
    <Layout>
      <h1>Add Workout</h1>
      <NavBar />
      
      <FormControl 
        size="lg" 
        type="text" 
        placeholder="Workout name..." 
        value={workoutName} 
        onChange={event => setWorkoutName(event.target.value)} 
      />

      {workoutExercises.map(e => (
        <WorkoutExerciseTable key={e.exerciseId} workoutExercise={e} />
      ))}

      <Button className={styles.button} onClick={() => setShowModal(true)}>
        Add Exercise
      </Button>

      <AddWorkoutExerciseModal 
        show={showModal} 
        close={() => setShowModal(false)}
        add={(exercise: IExercise) => handleAdd(exercise)}
        exercises={props.exercises}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const res = await fetch('http://localhost:7071/api/GetExercises');
  const exercises: IExercise[] = await res.json();

  return {
    props: {
      exercises,
    }
  }
}