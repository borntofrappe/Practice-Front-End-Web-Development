import React from 'react';
import styled from 'styled-components';

// show the countdown timer in a heading element, with each set of time in a sraprate span
const OutputDisplay = ({ total, timeTotal }) => {
  // create the number of seconds, minutes and hours from timeTotal
  let seconds = timeTotal;
  let minutes = 0;
  let hours = 0;
  while (seconds >= 60) {
    seconds -= 60;
    minutes += 1;
  }

  while (minutes >= 60) {
    minutes -= 60;
    hours += 1;
  }
  const time = {};
  if (hours > 0) {
    time.h = hours;
  }
  if (minutes > 0) {
    time.m = minutes;
  }
  time.s = seconds;

  const timeValues = Object.entries(time);
  const Text = timeValues.map((entry, index) => {
    const position = 90 / (timeValues.length + 1) * (index + 1);
    return ((
      <text
        x={position}
        y="45"
        fill="#0088ff"
        alignmentBaseline="middle"
        textAnchor="middle"
        key={entry[0]}
        fontWeight="bold"
        fontSize="1rem"
      >
        {entry[1]}
        <tspan
          fontSize="0.35rem"
          alignmentBaseline="hanging"
        >
          {entry[0]}
        </tspan>
      </text>
    ));
  })

  const perimeter = 43 * 2 * 3.14;
  const progress = (1 - timeTotal / total);
  const transform = `rotate(-${progress * 360}) translate(0 -43) rotate(${progress * 360})`;


  return (

    <svg viewBox="0 0 100 100" width="70%">
      <g transform="translate(5 5)">

        <path
          d="M 45 2 a 43 43 0 0 0 0 86 a 43 43 0 0 0 0 -86"
          stroke="#fff"
          strokeWidth="2"
          fill="none"
          shapeRendering="geometricPrecision"
        />

        <path
          d="M 45 2 a 43 43 0 0 0 0 86 a 43 43 0 0 0 0 -86"
          stroke="#0088ff"
          strokeWidth="2"
          strokeDasharray={perimeter}
          strokeDashoffset={perimeter - (perimeter * progress)}
          fill="none"
          shapeRendering="geometricPrecision"
        />

        <circle
          r="3.2"
          cx="45"
          cy="45"
          fill="#0088ff"
          transform={transform}
        />

        {
          Text
        }
      </g>

    </svg>
  )
};

export default OutputDisplay;