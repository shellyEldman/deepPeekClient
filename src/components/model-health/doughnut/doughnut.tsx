import "./doughnut.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ChartOptions, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, ChartDataLabels);

// Doughnut chart data
const data = {
  labels: ["1", "2", "3", "4", "5"],
  datasets: [
    {
      data: [1, 1, 1, 1, 1], // Equal values for 5 segments
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
        "rgba(4, 98, 118, 0.2)",
        "rgba(101,51,148, 0.2)",
        "rgba(233,57,160, 0.4)",
        "rgba(116,27,71, 0.2)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 0.6)",
        "rgba(4, 98, 118,0.8)",
        "rgba(101,51,148, 0.8)",
        "rgba(233,57,160, 1)",
        "rgba(116,27,71, 0.8)",
      ],
      borderWidth: [1, 1, 1, 2, 1],
    },
  ],
};

// Doughnut chart options
const options: ChartOptions<"doughnut"> = {
  circumference: 225, // 62.5% of a full circle
  rotation: -112.5, // Adjusts starting point to the upper pa
  animation: {
    duration: 0, // Disables animation
  },
  plugins: {
    datalabels: {
      color: (context: { dataIndex: number }) => {
        return context.dataIndex === 3
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0.4)";
      },
      textAlign: "center" as const,
      font: {
        weight: 600,
        size: 22,
      },
      formatter: (_value: number, ctx: any) => {
        return ctx.chart.data.labels[ctx.dataIndex];
      },
    },
    legend: {
      display: false,
    },
  },
};

const DoughnutChart = () => {
  return (
    <div className="doughnut flex-fill align-self-center">
      <Doughnut data={data} options={options} />
      <div className="title">MODEL HEALTH</div>
    </div>
  );
};

export default DoughnutChart;
