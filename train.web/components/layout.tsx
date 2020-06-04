import { Container } from "react-bootstrap";
import Head from "next/head";
import NavBar from "./navbar/Navbar";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Train</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <Container>{children}</Container>
    </>
  );
}

export default Layout;