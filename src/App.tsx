import "./style/app.scss";
import ModelHealth from "./components/model-health/model-health";
import ModelTraffic from "./components/model-traffic/model-traffic";

const App = () => {
  return (
    <div className="app d-flex">
      <ModelHealth />
      <ModelTraffic />
    </div>
  );
};

export default App;
