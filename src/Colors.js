import React, { useState, useEffect } from "react";
import TransitionBlock from "./TransitionBlock";

export default function Colors(props) {
  const { startColor, endColor } = props;
  const [number, setNumber] = useState(2);
  const [startRgb, setStartRgb] = useState([]);
  const [endRgb, setEndRgb] = useState([]);
  const [display, setDisplay] = useState(false);
  const [transition, setTransition] = useState([]);

  useEffect(() => {
    let start = startColor.slice(1, 7);
    let end = endColor.slice(1, 7);
    setStartRgb(convertHexToRgb(start));
    setEndRgb(convertHexToRgb(end));
  }, [startColor, endColor]);
  const convertHexToRgb = color => {
    if (color.length === 6) {
      let red = parseInt(color.substring(0, 2), 16);
      let green = parseInt(color.substring(2, 4), 16);
      let blue = parseInt(color.substring(4, 6), 16);
      let rgb = [red, green, blue];
      return rgb;
    }
  };
  const convertRbgToHex = color => {
    let red = color[0].toString(16);
    let blue = color[1].toString(16);
    let green = color[2].toString(16);
    let rgb = "#".concat(red, blue, green);
    return rgb;
  };
  const checkNumber = number => {
    if (number > 255) {
      return 255;
    }
    if (number < 0) {
      return 0;
    }
    return number;
  };
  const getColorRange = () => {
    const numberOfSteps = parseInt(number, 10);
    const rangeR = startRgb[0] - endRgb[0];
    const rangeG = startRgb[1] - endRgb[1];
    const rangeB = startRgb[2] - endRgb[2];
    const steps = numberOfSteps + 1;
    const incrementR = -Math.floor(rangeR / steps);
    const incrementG = -Math.floor(rangeG / steps);
    const incrementB = -Math.floor(rangeB / steps);
    let transition = [];
    for (let i = 0; i < numberOfSteps; i++) {
      if (i === 0) {
        transition.push([
          checkNumber(startRgb[0] + incrementR),
          checkNumber(startRgb[1] + incrementG),
          checkNumber(startRgb[2] + incrementB)
        ]);
      } else {
        transition.push([
          checkNumber(transition[i - 1][0] + incrementR),
          checkNumber(transition[i - 1][1] + incrementG),
          checkNumber(transition[i - 1][2] + incrementB)
        ]);
      }
    }
    let transitionArray = transition.map(color => convertRbgToHex(color));
    setTransition(transitionArray);
    setDisplay(true);
  };

  return (
    <div className="colors">
      <div className="input-wrapper">
        <input
          type="number"
          value={number}
          className="steps-input"
          min="1"
          max="10"
          onChange={e => setNumber(e.target.value)}
        />
        <button className="run-button" onClick={getColorRange}>
          Run
        </button>
      </div>
      <div className="transition">
        <TransitionBlock color={startColor} />
        {display &&
          transition.map(color => (
            <TransitionBlock color={color} key={color} />
          ))}
        <TransitionBlock color={endColor} />
      </div>
    </div>
  );
}
