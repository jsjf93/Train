import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

export default function({ exercises }) {
  return (
    <>
      <Head>
        <title>Train - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Exercises</h1>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const res = await fetch('http://localhost:7071/api/GetExercises');
  const exercises = await res.json();

  return {
    props: {
      exercises,
    }
  }
}