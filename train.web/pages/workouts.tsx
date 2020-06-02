import { GetServerSideProps } from "next";
import { IWorkout, IWorkoutExercise } from "../components/interfaces";
import Layout from "../components/layout";
import NavBar from "../components/navbar/Navbar";
import WorkoutCards from "../components/workouts/workout-cards/WorkoutCards";
import { Button } from "react-bootstrap";
import styles from '../styles/workouts.module.scss';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

interface IProps {
  workouts: IWorkout[];
}

export default function(props: IProps) {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<IWorkout[]>(props.workouts);

  const handleDelete = (id: number) => {
    fetch('http://localhost:7071/api/DeleteWorkout', {
      method: 'post',
      body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(data => {
      if (data === 200) {
        setWorkouts(workouts.filter(w => w.id !== id));
      }
    })
  };

  return (
    <Layout>
      <h1>Workouts</h1>
      <NavBar />

      <WorkoutCards workouts={workouts} deleteWorkout={handleDelete} />

      <Link href="/workouts/createworkout">
        <Button className={styles.workoutButton}>
          New Workout
        </Button>
      </Link>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const res = await fetch('http://localhost:7071/api/GetWorkouts');
  const workouts: IWorkout[] = await res.json();

  return {
    props: {
      workouts,
    }
  }
}