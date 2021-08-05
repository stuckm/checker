import "./styles.css";
import { Image, Statistic } from "semantic-ui-react";
import { sep, intToString } from "./util";
import { Link } from "react-router-dom";

export default function GridList({ gain, vol }) {
  if (gain.length > 1) {
    let gainer, volume;
    if (gain[99].name === "Tether") {
      gainer = gain[98];
    } else {
      gainer = gain[99];
    }
    if (vol[99].name === "Tether") {
      volume = vol[98];
    } else {
      volume = vol[99];
    }
    return (
      <div className="main-grid">
        <div className="grid-child">
          <h2>Top Gainer (24h)</h2>
          <div className="grid-child-det">
            <Link to={`/coin/${gainer.id}`}>
              <Image size="tiny" src={gainer.image} />
            </Link>
            <div className="grid-child-info">
              <Link to={`/coin/${gainer.id}`}>
                <h3>{gainer.name}</h3>
              </Link>
              <Statistic
                size="tiny"
                color={gainer.price_change_percentage_24h > 0 ? "green" : "red"}
              >
                <Statistic.Value>
                  {gainer.price_change_percentage_24h.toFixed(2)}%
                </Statistic.Value>
              </Statistic>
            </div>
            <div className="grid-child-price">
              <Statistic size="tiny">
                <Statistic.Value>
                  ${sep(gainer.current_price.toFixed(2))}
                </Statistic.Value>
              </Statistic>
            </div>
          </div>
        </div>
        <div className="grid-child">
          <h2>Top Loser (24h)</h2>
          <div className="grid-child-det">
            <Link to={`/coin/${gain[0].id}`}>
              <Image size="tiny" src={gain[0].image} />
            </Link>
            <div className="grid-child-info">
              <Link to={`/coin/${gain[0].id}`}>
                <h3>{gain[0].name}</h3>
              </Link>
              <Statistic
                size="tiny"
                color={
                  gain[0].price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                <Statistic.Value>
                  {gain[0].price_change_percentage_24h.toFixed(2)}%
                </Statistic.Value>
              </Statistic>
            </div>
            <div className="grid-child-price">
              {" "}
              <Statistic size="tiny">
                <Statistic.Value>
                  ${sep(gain[0].current_price.toFixed(2))}
                </Statistic.Value>
              </Statistic>
            </div>
          </div>
        </div>
        <div className="grid-child">
          <h2>Most Volume (24h)</h2>
          <div className="grid-child-det">
            <Link to={`/coin/${volume.id}`}>
              <Image size="tiny" src={volume.image} />
            </Link>
            <div className="grid-child-info">
              <Link to={`/coin/${volume.id}`}>
                <h3>{volume.name}</h3>
              </Link>
              <Statistic size="tiny">
                <Statistic.Value>
                  ${intToString(volume.total_volume)}
                </Statistic.Value>
              </Statistic>
            </div>
            <div className="grid-child-price">
              <Statistic size="tiny">
                <Statistic.Value>
                  ${sep(volume.current_price.toFixed(2))}
                </Statistic.Value>
              </Statistic>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
