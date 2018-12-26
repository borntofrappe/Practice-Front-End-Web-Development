import React from 'react';

// hours component, taking the current hours and drawing a hand rotated as per the number of hours
// 12 hours clock
const Hours = ({ hours, size }) => {
  const hourTwelve = hours >= 12 ? hours -= 12 : hours;
  const d = `M 0 0 v -${size}`;
  const rotate = `rotate(${hourTwelve * 360 / 12})`;

  return (
    <g className="hand">
      <path
        stroke="#999"
        strokeWidth="5px"
        strokeLinecap="round"
        fill="none"
        d={d}
        transform={rotate}
        // 'fix', so to speak, to roughly avoid the rotation which occurs from 12 to 1 o clock (same for minutes and seconds)
        className={hours === 12 ? 'fix' : ''} />
    </g>
  );
};

export default Hours;