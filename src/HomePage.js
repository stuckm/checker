import "./styles.css";
import { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import LayOut from "./LayOut";
import GridList from "./GridList";
import PriceTable from "./PriceTable";

function HomePage({ history }) {
  const [data, setData] = useState([]);
  const [topGainer, setPerData] = useState({});
  const [topVol, setVolumeData] = useState({});
  const [query, setQuery] = useState("");

  const handleRequest = (e) => {
    e.preventDefault();
    const queryTerm = e.target.elements.query.value;
    if (queryTerm === query) {
      return;
    }
    setQuery(queryTerm);
    history.push(`coin/${queryTerm}`);
  };

  useEffect(() => {
    const getData = async () => {
      await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
      )
        .then((res) => {
          return res.json();
        })
        .then((info) => {
          setData(info);
        });
    };
    getData();
  }, []);

  useEffect(() => {
    let dataClone = data.slice();
    let zz = data.slice();
    let pp = data.slice();

    const percentData = zz.sort((a, b) => {
      if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
        return 1;
      } else {
        return -1;
      }
    });

    const volData = dataClone.sort((a, b) => {
      if (a.total_volume > b.total_volume) {
        return 1;
      } else {
        return -1;
      }
    });

    setVolumeData(volData);
    setPerData(percentData);
  }, [data]);

  if (data.length > 0) {
    return (
      <div className="App">
        <LayOut setQuery={handleRequest} query={query}>
          <GridList gain={topGainer} vol={topVol} />
          <PriceTable stuff={data} />
        </LayOut>
      </div>
    );
  } else {
    return (
      <Dimmer inverted active>
        <Loader size="massive" />
      </Dimmer>
    );
  }
}
export default withRouter(HomePage);
