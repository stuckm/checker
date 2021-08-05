import "./styles.css";
import React, { useEffect } from "react";
import { Table, Image, Statistic } from "semantic-ui-react";
import LineGraph from "./LineGraph";
import { sep, intToString } from "./util";
import _ from "lodash";
import { Link } from "react-router-dom";

function exampleReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending"
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending"
      };
    default:
      throw new Error();
  }
}

export default function PriceTable({ stuff }) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: stuff,
    direction: null
  });
  const { column, data, direction } = state;

  useEffect(() => {
    console.log(stuff);
  }, [stuff]);

  return (
    <Table celled fixed sortable unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === "name" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "name" })}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "current_price" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "current_price" })
            }
          >
            Price
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "price_change_percentage_24h" ? direction : null}
            onClick={() =>
              dispatch({
                type: "CHANGE_SORT",
                column: "price_change_percentage_24h"
              })
            }
          >
            Change (24h)
          </Table.HeaderCell>
          <Table.HeaderCell>Price Chart</Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "total_volume" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "total_volume" })
            }
          >
            Volume (24h)
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "market_cap" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "market_cap" })
            }
          >
            Market Cap
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((coin, index) => {
          let j;
          if (coin.current_price.toFixed(2) < 0.01) {
            j = coin.current_price.toFixed(6);
          } else if (coin.current_price.toFixed(2) < 0.1) {
            j = coin.current_price.toFixed(4);
          } else {
            j = coin.current_price.toFixed(2);
          }

          return (
            <Table.Row key={index}>
              <Table.Cell className="table-name-cell">
                <Link to={`/coin/${coin.id}`}>
                  <Image size="mini" src={coin.image} />
                  <h4> {coin.name}</h4>
                  <p> {coin.symbol.toUpperCase()}</p>
                </Link>
              </Table.Cell>
              <Table.Cell>
                <div className="stats-desk">
                  <Statistic
                    className="stats-desk"
                    size="mini"
                    color={
                      coin.price_change_percentage_24h > 0 ? "green" : "red"
                    }
                  >
                    <Statistic.Value>$ {sep(j)}</Statistic.Value>
                  </Statistic>
                </div>
                <p
                  className="stats-mob"
                  style={{
                    color:
                      coin.price_change_percentage_24h > 0 ? "green" : "red"
                  }}
                >
                  ${sep(j)}
                </p>
              </Table.Cell>
              <Table.Cell>
                <div className="stats-desk">
                  <Statistic
                    size="mini"
                    color={
                      coin.price_change_percentage_24h > 0 ? "green" : "red"
                    }
                  >
                    <Statistic.Value>
                      {coin.price_change_percentage_24h.toFixed(2)} %
                    </Statistic.Value>
                  </Statistic>
                </div>
                <p
                  className="stats-mob"
                  style={{
                    color:
                      coin.price_change_percentage_24h > 0 ? "green" : "red"
                  }}
                >
                  {coin.price_change_percentage_24h.toFixed(2)} %
                </p>
              </Table.Cell>
              <Table.Cell>
                <LineGraph cast={coin.sparkline_in_7d.price} />
              </Table.Cell>

              <Table.Cell>
                <div className="stats-desk">${sep(coin.total_volume)} </div>
                <p className="stats-mob"> ${intToString(coin.total_volume)}</p>
              </Table.Cell>

              <Table.Cell>
                <div className="stats-desk">${sep(coin.market_cap)}</div>
                <p className="stats-mob"> ${intToString(coin.market_cap)}</p>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
