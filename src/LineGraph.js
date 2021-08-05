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
      enabled: false
    }
  },
  maintainAspectRatio: true,
  scales: {
    x: {
      display: false,
      title: {
        display: true,
        text: "Month"
      }
    },
    y: {
      display: false
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

const createStuff = (data) => {
  let info = data.slice(-24);
  return info.map((day, index) => {
    let hour = moment();

    let time = hour.subtract(index, "hours");
    let tt = time.format("h:MM A");
    var obj = {};
    obj["x"] = tt;
    obj["y"] = day;

    return obj;
  });
};

function LineGraph({ cast }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let stuff = createStuff(cast);
    setData(stuff);
  }, []);

  return (
    <Container style={{ width: "300px" }}>
      <div>
        {data?.length > 0 && (
          <Line
            options={options}
            data={{
              datasets: [
                {
                  borderColor: "#2185d0",
                  fill: false,
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

export default LineGraph;
