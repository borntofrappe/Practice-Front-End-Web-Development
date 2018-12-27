import React from 'react';

// seconds component, taking the current seconds, drawing 60 ticks for each second in the dial and highlighting the current second
// additionally detailing a triangle pointing toward the current second
const Seconds = ({ size, seconds, spread, turn }) => {
  // seconds ticks
  const SecondsPath = [];
  for (let i = 1; i <= 60; i++) {
    const rotate = `rotate(${i * 360 / 60})`;
    const d = `M 0 -${spread} v -${size}`;
    SecondsPath.push(
      <path
        key={i}
        stroke="#eee"
        strokeWidth="2px"
        strokeLinecap="square"
        fill="none"
        className={(i === seconds + 1) ? 'current' : ''}
        d={d}
        transform={rotate} />
    );
  }

  // triangle marker
  const markerPath = `M 0 -${spread - 5} l 5 7 h -10 Z`;
  const markerRotation = `rotate(${(seconds + 1) * 360 / 60 + (360 * turn)})`;


  return (
    <g>
      {/* ticks nested in a group to specifically target the path elements in CSS */}
      <g className="seconds">
        {
          SecondsPath
        }
      </g>
      <path
        stroke="none"
        fill="#eee"
        d={markerPath}
        transform={markerRotation} />
    </g>
  );
};

export default Seconds;