import "./styles.css";
import "./styles.css";

import { Link, withRouter } from "react-router-dom";

import LayOut from "./LayOut";

export default function Error({ history }) {
  const handleRequest = (e) => {
    e.preventDefault();
    const queryTerm = e.target.elements.query.value;
    history.push(`/coin/${queryTerm}`);
  };

  return (
    <LayOut setQuery={handleRequest}>
      <div className="error-page">
        <h1>We could'nt find what you were looking for</h1>
        <Link to="/">
          <h3>Return Home</h3>
        </Link>
      </div>
    </LayOut>
  );
}
