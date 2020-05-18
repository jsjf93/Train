import { GetStaticProps } from "next";
import { IWorkout } from "../components/interfaces";
import Layout from "../components/layout";
import NavBar from "../components/navbar/navbar";

interface IProps {
  workouts: IWorkout[];
}

export default function(props: IProps) {
  return (
    <Layout>
      <h1>Workouts</h1>
      <NavBar />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const res = await fetch('http://localhost:7071/api/GetWorkouts');
  const workouts: IWorkout[] = await res.json();

  return {
    props: {
      workouts,
    }
  }
}