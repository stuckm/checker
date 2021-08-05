import "./styles.css";
import Footer from "./Footer";
import Header from "./Header";
import { Container } from "semantic-ui-react";

export default function LayOut({ children, setQuery, query }) {
  return (
    <>
      <Header getQuery={setQuery} query={query} />
      <Container>{children} </Container>
      <Footer />
    </>
  );
}
