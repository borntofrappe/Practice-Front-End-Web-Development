import React from 'react';

const Seconds = ({ size, seconds, spread }) => {
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
        class={(i === seconds + 1) ? 'current' : ''}
        d={d}
        transform={rotate}>

      </path>
    );
  }
  return (
    <g class="seconds">
      {
        SecondsPath
      }
    </g>
  );
};

export default Seconds;