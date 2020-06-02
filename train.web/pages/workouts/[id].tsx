import { GetServerSideProps } from "next";
import { IWorkout, IWorkoutExercise, IExercise } from "../../components/interfaces";
import Layout from "../../components/layout";
import NavBar from "../../components/navbar/Navbar";
import { FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import WorkoutExerciseTable from "../../components/workouts/WorkoutExercises/WorkoutExerciseTable";
import AddWorkoutExerciseModal from "../../components/modals/AddWorkoutExerciseModal";
import styles from '../../styles/CreateWorkout.module.scss';
import { useRouter } from "next/router";

interface IProps {
  workout: IWorkout;
  exercises: IExercise[];
}

export default function (props: IProps) {
  const [workoutName, setWorkoutName] = useState(props.workout.workoutName);
  const [workoutExercises, setWorkoutExercises] = useState<IWorkoutExercise[]>(props.workout.workoutExercises);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleAdd = (exercise: IExercise) => {
    setWorkoutExercises(workoutExercises.concat({ ...exercise }));
    setShowModal(false);
  };

  const handleChange = (workoutExercise: IWorkoutExercise) => {
    const updated = workoutExercises.map(w => w.exerciseId !== workoutExercise.exerciseId ? w : workoutExercise);
    setWorkoutExercises(updated);
  };

  const handleRemove = (workoutExercise: IWorkoutExercise) => {
    const updated = workoutExercises.filter(w => w.exerciseId !== workoutExercise.exerciseId);
    setWorkoutExercises(updated);
  }

  const update = () => {
    fetch('http://localhost:7071/api/UpdateWorkout', {
      method: 'post',
      body: JSON.stringify({ workoutId: props.workout.id, workoutName, workoutExercises })
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
      <h1>Update Workout</h1>
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
          key={e.workoutExerciseId} 
          workoutExercise={e}
          handleChange={handleChange}
          removeWorkoutExercise={handleRemove}
        />
      ))}

      <Button className={styles.button} onClick={() => setShowModal(true)}>
        Add Exercise
      </Button>

      <Button className={styles.button} onClick={update}>
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
};

export const getServerSideProps: GetServerSideProps = async context => {
  const workoutResult = await fetch('http://localhost:7071/api/GetWorkout', {
    method: 'post',
    body: JSON.stringify({ id: context.query.id }),
  });
  const workout: IWorkout = await workoutResult.json();

  const exerciseResult = await fetch('http://localhost:7071/api/GetExercises');
  const exercises: IExercise[] = await exerciseResult.json();

  return {
    props: {
      workout,
      exercises,
    }
  }
}