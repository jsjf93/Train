import Link from "next/link";
import { GetStaticProps } from "next";
import { useState } from "react";

import { Container, Row } from "react-bootstrap";
import ExerciseTable from "../components/exercises/exercise-table";
import AddButton from "../components/exercises/add-button";
import { IExercise } from "../components/interfaces";
import Layout from "../components/layout";
import { ExerciseModal } from "../components/modals/exercise-modal";


export default function({ exercises }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <h1>Exercises</h1>
      <Link href="/">
        <a>Home</a>
      </Link>

      <ExerciseTable exercises={exercises}/>

      <AddButton buttonText="Add Exercise" handleClick={() => setShowModal(true)}/>
      <ExerciseModal
        show={showModal}
        buttonText="Add Exercise" 
        handleClick={() => console.log('Clicked')}
        handleClose={() => setShowModal(false)}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const res = await fetch('http://localhost:7071/api/GetExercises');
  const exercises: IExercise[] = await res.json();

  return {
    props: {
      exercises,
    }
  }
}