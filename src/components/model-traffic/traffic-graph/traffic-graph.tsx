import "./traffic-graph.scss";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, ChartOptions, Point } from "chart.js";

const options: ChartOptions<"line"> = {
  animation: {
    duration: 0,
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 5,
      ticks: {
        stepSize: 1,
        color: "rgba(255, 255, 255, 0.6)",
        font: {
          size: 14,
        },

        callback: function (tickValue: string | number) {
          const value = parseFloat(tickValue as string);
          if (value % 1 === 0) {
            // present only round numbers
            return value;
          }
        },
      },
      title: {
        display: true,
        text: "Number of Events",
        color: "rgba(255, 255, 255, 0.6)",
        font: {
          size: 16,
        },
        padding: { bottom: 20 },
      },
    },
    x: {
      title: {
        display: true,
        text: "Time (local)",
        color: "rgba(255, 255, 255, 0.6)",
        font: {
          size: 16,
        },
        padding: { top: 20 },
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 4,
        color: "rgba(255, 255, 255, 0.6)",
        font: {
          size: 14,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const emptyChartData: ChartData<"line", (number | Point | null)[], unknown> = {
  datasets: [],
};

const TrafficGraph = ({
  minutesToDispaly,
  chartData,
}: {
  minutesToDispaly: number;
  chartData: ChartData<"line", (number | Point | null)[], unknown>;
}) => {
  const [dataToDisplay, setDataToDisplay] =
    useState<ChartData<"line", (number | Point | null)[], unknown>>(
      emptyChartData
    );

  useEffect(() => {
    const labels = chartData.labels?.slice(-minutesToDispaly);
    const datasets = chartData.datasets.map((dataset) => {
      const data = dataset.data.slice(-minutesToDispaly);
      return { ...dataset, data };
    });

    setDataToDisplay({
      labels,
      datasets,
    });
  }, [minutesToDispaly, chartData]);

  if (!dataToDisplay.datasets.length) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="traffic-graph">
      <Line data={dataToDisplay} options={options} />
    </div>
  );
};

export default TrafficGraph;
