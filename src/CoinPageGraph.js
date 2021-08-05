import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Container } from "semantic-ui-react";
import moment from "moment";

const options = {
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      intersect: false
    }
  },
  maintainAspectRatio: true,
  scales: {
    x: {
      display: false
    },
    y: {
      alignToPixels: true
    }
  },
  elements: {
    line: {
      tension: 0.1
    },
    point: {
      radius: 0
    }
  }
};

const createStuff = (data, add) => {
  let info = data.slice();
  info.push(add);
  return info.map((day, index) => {
    let j = 169 - index;
    let hour = moment();
    let time = hour.subtract(j, "hours");
    let tt = time.format("MM/DD h a");
    var obj = {};
    obj["x"] = tt;
    obj["y"] = day;

    return obj;
  });
};

function CoinPageGraph({ cast, add }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let stuff = createStuff(cast, add);
    setData(stuff);
  }, []);

  return (
    <Container>
      <div>
        {data?.length > 0 && (
          <Line
            options={options}
            data={{
              datasets: [
                {
                  borderColor: "black",
                  fill: true,
                  data: data
                }
              ]
            }}
          />
        )}
      </div>
    </Container>
  );
}

export default CoinPageGraph;
