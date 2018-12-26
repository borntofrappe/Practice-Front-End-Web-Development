import React from 'react';

const Hours = ({ spread, size, hours }) => {
  const translate = `translate(${spread}, ${spread})`;


  const hourTwelve = hours >= 12 ? hours -= 12 : hours;
  const d = `M 0 0 v -${size}`;
  const rotate = `rotate(${hourTwelve * 360 / 12})`;

  return (
    <g transform={translate}>
      <path
        stroke="#999"
        strokeWidth="4px"
        strokeLinecap="round"
        fill="none"
        d={d}
        transform={rotate} />
    </g>
  );
};

export default Hours;