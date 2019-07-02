import React from "react";
import paints from "./paints.json";

export default function TransitionBlock(props) {
  const { color } = props;

  const getPaintSimilar = () => {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    let redDiff = 1000;
    let greenDiff = 1000;
    let blueDiff = 1000;
    let closest = {};

    paints.forEach(paint => {
      const rdiff = Math.abs(red - paint.red);
      const rCloser = rdiff < redDiff || rdiff === 0;

      const gdiff = Math.abs(green - paint.green);
      const gCloser = gdiff < greenDiff || gdiff === 0;
      const bdiff = Math.abs(blue - paint.blue);
      const bCloser = bdiff < blueDiff || bdiff === 0;

      if (rCloser && gCloser && bCloser) {
        redDiff = rdiff;
        greenDiff = gdiff;
        blueDiff = bdiff;
        closest = paint;
      }
    });

    return closest;
  };

  const closestColor = getPaintSimilar();

  return (
    <div className="transition-block" style={{ background: color }}>
      {closestColor.color && (
        <div className="transition-name">
          <span>{closestColor.name}</span>
          <div
            className="close-color"
            style={{ background: closestColor.color }}
          />
        </div>
      )}
    </div>
  );
}
