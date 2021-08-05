import "./styles.css";
import { Input, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Header({ getQuery }) {
  return (
    <div className="logo-cont">
      <div>
        <Link to="/">
          <h1 className="logo">Checker</h1>
        </Link>
      </div>
      <div className="search">
        <Form onSubmit={getQuery}>
          <Input className="search" icon="search" name="query" type="text" />
          <Button size="tiny" icon="search" type="submit"></Button>
        </Form>
      </div>
    </div>
  );
}
