import { GetServerSideProps } from "next";
import { IWorkout } from "../../components/interfaces";

interface IProps {
  workout: IWorkout;
}

export default function UpdateWorkout(props: IProps) {
  return (
    <>
      <div>Name: {props.workout.workoutName}</div>
      <div>Id: {props.workout.id}</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const res = await fetch('http://localhost:7071/api/GetWorkout', {
    method: 'post',
    body: JSON.stringify({ id: context.query.id }),
  });
  const workout: IWorkout = await res.json();

  return {
    props: {
      workout,
    }
  }
}