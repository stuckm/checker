import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CoinPage from "./CoinPage";
import Error from "./Error";

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/coin/:coinId" component={CoinPage} />
        <Route path="/404" component={Error} />
      </Router>
    </>
  );
};

export default App;
