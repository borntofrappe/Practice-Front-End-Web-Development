import React from 'react';

const Minutes = ({ spread, size, minutes }) => {
  const translate = `translate(${spread} ${spread})`;

  const d = `M 0 0 v -${size}`;
  const rotate = `rotate(${minutes * 360 / 60})`;
  return (
    <g transform={translate}>
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