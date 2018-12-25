import React from 'react';

const Minutes = ({ minutes, size, colors }) => {
  const handSize = size / 2;
  const d = `M 0 0 v ${-handSize / 1.5}`;
  const translate = `translate(${handSize} ${handSize})`;
  const rotate = `rotate(${(minutes + 1) * 360 / 60})`;
  return (
    <g transform={translate}>
      <path
        stroke={colors.text}
        strokeWidth="2px"
        strokeLinecap="round"
        fill="none"
        d={d}
        transform={rotate} />
    </g>
  );
};

export default Minutes;