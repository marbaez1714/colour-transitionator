import React, { useState } from "react";
import ReactDOM from "react-dom";
import Colors from "./Colors";
import ColorPicker from "./ColorPicker";
import "./styles.scss";

function App() {
  const [startColor, setStartColor] = useState("transparent");
  const [endColor, setEndColor] = useState("transparent");

  return (
    <div className="App">
      <h1> Citadel Colour Transitionator</h1>
      <h2>by airymario</h2>
      <p>
        Find out how your paint will blend between the two selections you make.
      </p>
      <p>
        Hover over the transition blocks to find the color that best matches the
        transition tone!
      </p>

      <Colors startColor={startColor} endColor={endColor} />
      <div className="picker-wrapper">
        <ColorPicker selectedColor={startColor} handleChange={setStartColor} />
        <ColorPicker selectedColor={endColor} handleChange={setEndColor} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
