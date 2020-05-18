import Head from 'next/head';
import Layout from '../components/layout';
import NavBar from '../components/navbar/navbar';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Train - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Home</h1>
        <NavBar />
      </div>
    </Layout>
  )
}
