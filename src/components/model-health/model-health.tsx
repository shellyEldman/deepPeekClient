import "./model-health.scss";
import DoughnutChart from "./doughnut/doughnut";
import { Form } from "react-bootstrap";
import MetricBox from "./metrics/metric-box";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const ModelHealth = () => {
  const [performance, setPerformance] = useState<number | null>(null);

  const printPerformanceError = useCallback((error: string) => {
    setPerformance(null);
    console.error(error);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_SERVER_URL + "getPerformance"
        );
        const performanceData = parseInt(response.data?.performance);
        if (!isNaN(performanceData)) {
          setPerformance(performanceData);
        } else {
          // Handle case where conversion to number fails
          printPerformanceError("Received non-numeric data");
        }
      } catch (err) {
        printPerformanceError(`Server error - ${err}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [printPerformanceError]);

  return (
    <div className="model-health d-flex flex-column">
      <div className="flex-fill d-flex justify-content-between align-items-start">
        <div className="status">Running</div>
        <DoughnutChart />
        <Form.Select className="custom-select">
          <option value="2hours">Last 2 hours</option>
          <option value="24hours">Last 24 hours</option>
        </Form.Select>
      </div>
      <div className="d-flex justify-content-between mt-auto px-2">
        <MetricBox title="Latency" data="15ms" growth={5} direction="down" />
        <MetricBox
          title="Attacks Rate"
          data="8/min"
          growth={2}
          direction="up"
        />
        <MetricBox
          title="Performance"
          data={performance ? `${performance}ms` : "N/A"}
          growth={8}
          direction="up"
        />
      </div>
    </div>
  );
};

export default ModelHealth;
