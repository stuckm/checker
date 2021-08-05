import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LayOut from "./LayOut";
import {
  Image,
  Statistic,
  Dimmer,
  Loader,
  Label,
  Container,
  Button
} from "semantic-ui-react";
import { sep } from "./util";
import CoinPageGraph from "./CoinPageGraph";

const CoinPage = ({ match, history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const handleRequest = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const queryTerm = e.target.elements.query.value;
    history.push(`${queryTerm}`);
    setIsLoading(false);
  };

  function createMarkup(e) {
    return { __html: `${e}` };
  }

  const {
    params: { coinId }
  } = match;

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&sparkline=true`,
      {}
    )
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(response);
      })
      .catch(function () {
        history.replace("/404");
        console.log("error");
      });
  }, [coinId]);

  if (isLoading === false) {
    return (
      <LayOut setQuery={handleRequest}>
        <div className="coin-header">
          <h1> {data.name}</h1>
          <Image src={data.image.small} />
        </div>
        <h2 className="coin-symbol">{data.symbol.toUpperCase()}</h2>

        <div className="tag-holder">
          {data.categories.map((cat) => {
            return <Label className="tag-holder-tag">{cat}</Label>;
          })}
        </div>
        <Statistic
          className="stats-desk"
          size="tiny"
          color={
            data.market_data.price_change_percentage_24h_in_currency.usd > 0
              ? "green"
              : "red"
          }
        >
          <Statistic.Value>
            $ {sep(data.market_data.current_price.usd.toFixed(2))}
          </Statistic.Value>
        </Statistic>
        <Statistic
          size="tiny"
          color={
            data.market_data.price_change_percentage_24h_in_currency.usd > 0
              ? "green"
              : "red"
          }
        >
          <Statistic.Value>
            {data.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
              2
            )}{" "}
            %
          </Statistic.Value>
        </Statistic>

        <CoinPageGraph
          cast={data.market_data.sparkline_7d.price}
          add={data.market_data.current_price.usd}
        />
        <Container className="coin-desc">
          <p dangerouslySetInnerHTML={createMarkup(data.description.en)}></p>
        </Container>
        <Link to="/">
          {" "}
          <Button primary>Back to Home</Button>
        </Link>
      </LayOut>
    );
  } else {
    return (
      <Dimmer inverted active>
        <Loader size="massive" />
      </Dimmer>
    );
  }
};

export default withRouter(CoinPage);
