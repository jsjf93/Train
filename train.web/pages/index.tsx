import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Train - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Home</h1>
        <Link href='/exercises'>
          <a>Exercises</a>
        </Link>
      </div>
    </div>
  )
}
