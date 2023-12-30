import { ChartData } from "chart.js";

export const generateInitialData = (length: number, max: number): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
};

export const getNextLabel = (currentLabel: string, incBy: number): string => {
  const timeParts = currentLabel.split(":").map(Number);
  const date = new Date();
  date.setHours(timeParts[0], timeParts[1], 0, 0);
  date.setMinutes(date.getMinutes() + incBy);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export const generateInitialTimeLabels = (
  startFrom: number,
  incBy: number
): string[] => {
  const labels = [];
  const now = new Date();
  now.setMinutes(now.getMinutes() - startFrom, 0, 0);

  for (let i = 0; i < startFrom; i++) {
    now.setMinutes(now.getMinutes() + incBy);
    const formattedTime = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    labels.push(formattedTime);
  }

  return labels;
};

export const getInitialChartData = (
  lineData: { name: string; color: string }[],
  startFrom: number,
  incBy: number,
  randomMax: number
): ChartData<"line"> => {
  return {
    labels: generateInitialTimeLabels(startFrom, incBy),
    datasets: lineData.map((data) => {
      return {
        label: data.name,
        data: generateInitialData(startFrom, randomMax),
        borderColor: data.color,
        tension: 1,
        pointRadius: 0,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        borderWidth: 2,
        datalabels: {
          display: false,
        },
      };
    }),
  };
};
