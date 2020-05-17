import Link from "next/link";
import { GetStaticProps } from "next";
import { useState } from "react";

import ExerciseTable from "../components/exercises/exercise-table";
import { IExercise, IBodyPart } from "../components/interfaces";
import Layout from "../components/layout";
import { ExerciseModal } from "../components/modals/exercise-modal";
import SubmitButton from "../components/exercises/submit-button";

interface IProps {
  exercises: IExercise[];
}

export default function(props: IProps) {
  const [exercises, setExercises] = useState(props.exercises);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<IExercise>(undefined);

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

  const updateExercise = (exercise: IExercise) => {
    const { exerciseId, exerciseName, bodyPartsUsed } = exercise;
    fetch('http://localhost:7071/api/UpdateExercise', {
      method: 'post',
      body: JSON.stringify({ exerciseId, exerciseName, bodyParts: bodyPartsUsed })
    })
    .then(res => res.json())
    .then((exercise: IExercise) => {
      const updated = exercises.map(e => e.exerciseId !== exercise.exerciseId ? e : exercise);
      setExercises(updated);
    })
  };

  const deleteExercise = (id: number) => (
    fetch('http://localhost:7071/api/DeleteExercise', {
      method: 'post',
      body: JSON.stringify({ id })
    })
    .then(res => {
      if (res.status === 200) {
        const updated = exercises.filter(e => e.exerciseId !== id);
        setExercises(updated);
      }
    })
  );

  const handleExerciseSelect = (exercise: IExercise) => {
    setSelectedExercise(exercise);
    setShowUpdateModal(true);
  };

  return (
    <Layout>
      <h1>Exercises</h1>
      <Link href="/">
        <a>Home</a>
      </Link>

      <ExerciseTable 
        exercises={exercises}
        handleClick={exercise => handleExerciseSelect(exercise)}
      />

      <SubmitButton buttonText="Add Exercise" handleClick={() => setShowAddModal(true)}/>
      {showAddModal && <ExerciseModal
        show={showAddModal}
        buttonText="Add Exercise" 
        handleAdd={(name: string, bodyParts: IBodyPart[]) => addExercise(name, bodyParts)}
        handleClose={() => setShowAddModal(false)}
      />}

      {showUpdateModal && <ExerciseModal 
        show={showUpdateModal}
        buttonText="Update Exercise"
        selectedExercise={selectedExercise}
        handleUpdate={(exercise: IExercise) => updateExercise(exercise)}
        handleDelete={(id: number) => deleteExercise(id)}
        handleClose={() => setShowUpdateModal(false)}
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