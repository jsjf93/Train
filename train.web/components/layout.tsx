import { Container } from "react-bootstrap";
import Head from "next/head";

function Layout({ children }) {
  return (
    <Container>
      <Head>
        <title>Train</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </Container>
  );
}

export default Layout;