import { GetServerSideProps } from "next";
import { IWorkout } from "../components/interfaces";
import Layout from "../components/layout";
import NavBar from "../components/navbar/Navbar";
import WorkoutCards from "../components/workouts/workout-cards/WorkoutCards";
import { Button } from "react-bootstrap";
import styles from '../styles/workouts.module.scss';
import Link from "next/link";

interface IProps {
  workouts: IWorkout[];
}

export default function(props: IProps) {
  return (
    <Layout>
      <h1>Workouts</h1>
      <NavBar />

      <WorkoutCards workouts={props.workouts}/>

      <Link href="/workouts/addworkout">
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