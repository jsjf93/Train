import Layout from "../../components/layout";
import NavBar from "../../components/navbar/Navbar";
import { FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { IWorkoutExercise, IExercise } from "../../components/interfaces";
import AddWorkoutExerciseModal from "../../components/modals/AddWorkoutExerciseModal";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import styles from '../../styles/CreateWorkout.module.scss';
import WorkoutExerciseTable from "../../components/workouts/WorkoutExercises/WorkoutExerciseTable";
import shortid from "shortid";

interface IProps {
  exercises: IExercise[];
}

export default function (props: IProps) {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<IWorkoutExercise[]>([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleAdd = (exercise: IExercise) => {
    setWorkoutExercises(workoutExercises.concat({ ...exercise, reactKey: shortid.generate() }));
    setShowModal(false);
  };

  const handleChange = (workoutExercise: IWorkoutExercise) => {
    const updated = workoutExercises.map(w => 
      w.workoutExerciseId !== workoutExercise.workoutExerciseId || w.reactKey !== workoutExercise.reactKey ? w : workoutExercise);
    setWorkoutExercises(updated);
  };

  const handleRemove = (workoutExercise: IWorkoutExercise) => {
    const updated = workoutExercises.filter(w => 
      w.workoutExerciseId !== workoutExercise.workoutExerciseId || w.reactKey !== workoutExercise.reactKey);
    setWorkoutExercises(updated);
  }

  const add = () => {
    fetch('http://localhost:7071/api/AddWorkout', {
      method: 'post',
      body: JSON.stringify({ userId: 1, workoutName, workoutExercises })
    })
    .then(res => res.json())
    .then(data => {
      if (data === 200) {
        router.push('/workouts');
      }
    })
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
        <WorkoutExerciseTable 
          key={e.exerciseId || e.reactKey} 
          workoutExercise={e}
          handleChange={handleChange}
          removeWorkoutExercise={handleRemove}
        />
      ))}

      <Button className={styles.button} onClick={() => setShowModal(true)}>
        Add Exercise
      </Button>

      <Button className={styles.button} onClick={add}>
        Save Workout
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
