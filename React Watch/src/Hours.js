import React from 'react';

const Hours = ({ hours, size, colors }) => {
  const handSize = size / 2;
  const hourTwelve = hours >= 12 ? hours -= 12 : hours;
  const d = `M 0 0 v ${-handSize / 2}`;
  const translate = `translate(${handSize} ${handSize})`;
  const rotate = `rotate(${(hourTwelve + 1) * 360 / 12})`;
  return (
    <g transform={translate}>
      <path
        stroke={colors.text}
        strokeWidth="4px"
        strokeLinecap="round"
        opacity="0.9"
        fill="none"
        d={d}
        transform={rotate} />
    </g>
  );
};

export default Hours;