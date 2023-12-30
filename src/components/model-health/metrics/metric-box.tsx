import { GraphDownArrow, GraphUpArrow } from "react-bootstrap-icons";
import "./metric-box.scss";

const MetricBox = ({
  title,
  data,
  growth,
  direction,
}: {
  title: string;
  data: string;
  growth: number;
  direction: "up" | "down";
}) => {
  return (
    <div className="metric-box">
      <div className="title">{title}</div>
      <div className="d-flex align-items-center mt-2">
        <div className="number">{data}</div>
        {direction === "up" ? (
          <>
            <GraphUpArrow className="green icon" />
            <div className="growth green">+{growth}</div>
          </>
        ) : (
          <>
            <GraphDownArrow className="red icon" />
            <div className="growth red">-{growth}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default MetricBox;
