import Layout from "../../components/layout";
import NavBar from "../../components/navbar/navbar";
import { FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { IWorkoutExercise } from "../../components/interfaces";
import AddWorkoutExerciseModal from "../../components/modals/AddWorkoutExerciseModal";

interface IProps {

}

export default function AddWorkout(props: IProps) {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<IWorkoutExercise[]>([]);
  const [showModal, setShowModal] = useState(false);

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

      {exercises.map(e => (
        <div key={e.exerciseId}>
          {e.exerciseName}
        </div>
      ))}

      <Button onClick={() => setShowModal(true)}>
        Add Exercise
      </Button>

      <AddWorkoutExerciseModal show={showModal} close={() => setShowModal(false)}/>
    </Layout>
  );
}