import React from 'react';

// minutes component, taking the current minutes and drawing a hand rotated as per the number of minutes
const Minutes = ({ size, minutes }) => {

  const d = `M 0 0 v -${size}`;
  const rotate = `rotate(${minutes * 360 / 60})`;
  return (
    <g class="hand">
      <path
        // thinner and with a more evident color
        stroke="#eee"
        strokeWidth="3px"
        strokeLinecap="round"
        fill="none"
        d={d}
        transform={rotate}
        class={minutes === 60 ? 'fix' : ''} />
    </g>
  );
};

export default Minutes;