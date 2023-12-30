import { Form } from "react-bootstrap";
import "./model-traffic.scss";
import { TrafficDataType } from "../../models/traffic-data";
import TrafficGraph from "./traffic-graph/traffic-graph";
import { useCallback, useEffect, useState } from "react";
import { getInitialChartData, getNextLabel } from "../../utils/graph-calc";
import axios from "axios";
import TrafficData from "./traffic-data/traffic-data";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const RANDOM_MAX = 6; // 0-5
const INCREMENT_BY = 1; // increment view by 1 min each second
const MAX_NUM_OF_MINUTS = 60; // initial 60 points for 1 hour to load

const lineData = [
  {
    name: "traffic",
    color: "#26babf",
  },
  {
    name: "detectors",
    color: "#bf26ad",
  },
  {
    name: "protectors",
    color: "#7b0ddb",
  },
];

const ModelTraffic = () => {
  const [minutesToDispaly, setMinutesToDisplay] = useState<number>(20);
  const [chartData, setChartData] = useState(
    getInitialChartData(lineData, MAX_NUM_OF_MINUTS, INCREMENT_BY, RANDOM_MAX)
  );

  const updateChartData = useCallback((data: TrafficDataType | null) => {
    setChartData((prevChartData) => {
      const labels = [...(prevChartData.labels || [])];
      const lastLabel = labels[labels.length - 1] as string;
      const newLabel = getNextLabel(lastLabel, 1);

      labels.push(newLabel);
      labels.shift(); // remove the oldest data

      const datasets = prevChartData.datasets.map((dataset) => {
        let newValue = null;
        if (data && dataset?.label && dataset.label in data) {
          newValue = data[dataset.label as keyof TrafficDataType];
        }
        const newData = [...(dataset.data as number[]), newValue];
        newData.shift(); // remove the oldest data
        return { ...dataset, data: newData };
      });

      return {
        ...prevChartData,
        labels,
        datasets,
      };
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(SERVER_URL + "getModelTraffic");

        updateChartData(response.data);
      } catch (err) {
        updateChartData(null);
        console.error(`Server error - ${err}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [updateChartData]);

  return (
    <div className="model-traffic">
      <div className="box">
        <div className="d-flex justify-content-between align-items-center">
          <div className="title">MODEL TRAFFIC</div>
          <Form.Select
            value={minutesToDispaly}
            onChange={(e) => setMinutesToDisplay(Number(e.target.value))}
            className="custom-select"
          >
            <option value="20">Last 20 minutes</option>
            <option value="60">Last 1 hour</option>
          </Form.Select>
        </div>
        <TrafficData
          chartData={chartData}
          minutesToDispaly={minutesToDispaly}
        />
        <TrafficGraph
          minutesToDispaly={minutesToDispaly}
          chartData={chartData}
        />
      </div>
    </div>
  );
};

export default ModelTraffic;
