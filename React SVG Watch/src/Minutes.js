import React from 'react';

const Minutes = ({ size, minutes }) => {

  const d = `M 0 0 v -${size}`;
  const rotate = `rotate(${minutes * 360 / 60})`;
  return (
    <g class="hand">
      <path
        stroke="#eee"
        strokeWidth="3px"
        strokeLinecap="round"
        fill="none"
        d={d}
        transform={rotate} />
    </g>
  );
};

export default Minutes;