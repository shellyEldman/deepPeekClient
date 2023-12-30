import { ChartData, Point } from "chart.js";
import "./traffic-data.scss";
import { useEffect, useState } from "react";

const SingleData = ({
  title,
  amount,
  color,
}: {
  title: string;
  amount: number | null;
  color: string;
}) => {
  return (
    <div className="single-data">
      <div className="d-flex align-items-center">
        <div className="dot" style={{ backgroundColor: color }} />
        <div className="title">{title}</div>
      </div>
      <div className="amount">{amount}</div>
    </div>
  );
};

const TrafficData = ({
  chartData,
  minutesToDispaly,
}: {
  chartData: ChartData<"line", (number | Point | null)[], unknown>;
  minutesToDispaly: number;
}) => {
  const [traffic, setTraffic] = useState<number | null>(null);
  const [detectors, setDetectors] = useState<number | null>(null);
  const [protectors, setProtectors] = useState<number | null>(null);

  useEffect(() => {
    chartData.datasets.forEach((dataset) => {
      const data = dataset.data.slice(-minutesToDispaly);
      const sum: number = data.reduce(
        (accumulator: number, currentValue: number | Point | null) => {
          return accumulator + (currentValue as number);
        },
        0
      );

      switch (dataset.label) {
        case "traffic":
          setTraffic(sum);
          break;
        case "detectors":
          setDetectors(sum);
          break;
        case "protectors":
          setProtectors(sum);
          break;
        default:
          break;
      }
    });
  }, [chartData, minutesToDispaly]);

  return (
    <div className="traffic-data d-flex">
      <SingleData title="Traffic Pattern" amount={traffic} color="#26babf" />
      <SingleData title="Detectors" amount={detectors} color="#bf26ad" />
      <SingleData title="Protectors" amount={protectors} color="#7b0ddb" />
    </div>
  );
};

export default TrafficData;
