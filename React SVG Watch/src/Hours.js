import React from 'react';

// hours component, taking the current hours and drawing a hand rotated as per the number of hours
// 12 hours clock
const Hours = ({ hours, size, turn }) => {


  const hourTwelve = hours >= 12 ? hours -= 12 : hours;
  const d = `M 0 0 v -${size}`;
  // turn allowing to go past the 0-360 range
  const rotate = `rotate(${hourTwelve * 360 / 12 + (360 * turn)})`;

  return (
    <g className="hand">
      <path
        stroke="#999"
        strokeWidth="5px"
        strokeLinecap="round"
        fill="none"
        d={d}
        transform={rotate} />
    </g>
  );
};

export default Hours;