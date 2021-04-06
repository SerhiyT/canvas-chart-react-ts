import React, { useEffect, useState } from "react";
import "./styles/styles.scss";
import { chart } from "./Chart";
import { getChartData } from "./utils/data";

const Canvas = () => {
  const [
    whiteMode,
    setWhiteMode,
  ] = useState(false);

  useEffect(
    () => {
      const showChart = chart(
        document.getElementById("chart"),
        getChartData(),
      );
      showChart?.init();
    },
    [],
  );

  return (
    <div className="container">

      <div className={`card ${whiteMode && "white-mode"}`}>
        <div className={`chart ${whiteMode && "white-mode"}`} id="chart">
          <div data-el="tooltip" className="chart-tooltip" />
          <button
            className={`${whiteMode && "white-mode"}`}
            id="theme-btn"
            onClick={() => setWhiteMode(!whiteMode)}
          />
          <canvas />
        </div>
      </div>
    </div>
  );
};

export default Canvas;
