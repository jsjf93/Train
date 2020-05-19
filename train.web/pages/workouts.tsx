import { GetServerSideProps } from "next";
import { IWorkout } from "../components/interfaces";
import Layout from "../components/layout";
import NavBar from "../components/navbar/navbar";
import { Row, CardDeck, Card } from "react-bootstrap";
import WorkoutCards from "../components/workouts/workouts-cards";

interface IProps {
  workouts: IWorkout[];
}

export default function(props: IProps) {
  return (
    <Layout>
      <h1>Workouts</h1>
      <NavBar />

      <WorkoutCards workouts={props.workouts}/>
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