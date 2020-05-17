import Link from "next/link";
import { GetStaticProps } from "next";
import { useState } from "react";

import ExerciseTable from "../components/exercises/exercise-table";
import AddButton from "../components/exercises/add-button";
import { IExercise, IBodyPart } from "../components/interfaces";
import Layout from "../components/layout";
import { ExerciseModal } from "../components/modals/exercise-modal";

interface IProps {
  exercises: IExercise[];
}

export default function(props: IProps) {
  const [exercises, setExercises] = useState(props.exercises);
  const [showModal, setShowModal] = useState(false);

  const addExercise = (exerciseName: string, bodyParts: IBodyPart[]) => (
    fetch('http://localhost:7071/api/AddExercise', {
      method: 'post',
      body: JSON.stringify({ exerciseName, bodyParts })
    })
    .then(res => res.json())
    .then((exercise: IExercise) => {
      setExercises(exercises.concat(exercise))
    })
  );

  const updateExercise = (exerciseId: number, exerciseName: string, bodyParts: IBodyPart[]) => (
    fetch('http://localhost:7071/api/AddExercise', {
      method: 'post',
      body: JSON.stringify({ exerciseId, exerciseName, bodyParts })
    })
    .then(res => res.json())
    .then((exercise: IExercise) => {
      exercises.map(e => e.exerciseId !== exercise.exerciseId ? e : exercise);
      setExercises(exercises.concat(exercise))
    })
  );

  return (
    <Layout>
      <h1>Exercises</h1>
      <Link href="/">
        <a>Home</a>
      </Link>

      <ExerciseTable exercises={exercises}/>

      <AddButton buttonText="Add Exercise" handleClick={() => setShowModal(true)}/>
      {showModal && <ExerciseModal
        show={showModal}
        buttonText="Add Exercise" 
        handleClick={(name: string, bodyParts: IBodyPart[]) => addExercise(name, bodyParts)}
        handleClose={() => setShowModal(false)}
      />}
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