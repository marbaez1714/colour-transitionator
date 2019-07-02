import React from "react";
import paints from "./paints.json";

const ColorButton = props => {
  const { color, handleChange, selectedColor } = props;
  return (
    <ColorToolTip color={color}>
      <button
        className={`color-button ${
          color.color === selectedColor ? "current" : ""
        }`}
        style={{ background: color.color }}
        title={color.name}
        onClick={() => handleChange(color.color)}
      />
    </ColorToolTip>
  );
};
const ColorToolTip = props => {
  const { children, color } = props;
  return (
    <div className="tooltip-anchor">
      <div className="tooltip">
        <div className="tooltip-color" style={{ background: color.color }} />
        <span>{color.name}</span>
      </div>
      {children}
    </div>
  );
};
export default function ColorPicker(props) {
  const { selectedColor, handleChange } = props;
  return (
    <div className="color-picker" style={{ background: selectedColor }}>
      <div className="color-block">
        {paints.map(color => (
          <ColorButton
            selectedColor={selectedColor}
            color={color}
            handleChange={handleChange}
            key={color.name}
          />
        ))}
      </div>
    </div>
  );
}
