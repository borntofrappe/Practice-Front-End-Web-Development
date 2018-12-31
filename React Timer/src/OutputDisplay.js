import React from 'react';
import OutputLabel from './OutputLabel';

// show the countdown timer through an SVG element, displaying the countdown in a text element
// wrap the text in a path element, animated to display the theme color as the timer progresses
const OutputDisplay = ({ total, timeTotal, label, isLabel, handleTimerLabel, handleTimerLabelInput }) => {
  // create the number of seconds, minutes and hours from timeTotal
  let s = timeTotal;
  let m = 0;
  let h = 0;
  while (s >= 60) {
    s -= 60;
    m += 1;
  }

  while (m >= 60) {
    m -= 60;
    h += 1;
  }
  // show the hours, minutes, seconds one after the other
  // using the unchanged value representing the total time, describe the amount of time only necessary
  // meaning, if the total is less than an hout, don't show the hour's label
  const time = {};
  if (total >= 3600) {
    time.h = h;
  }
  if (total >= 60) {
    time.m = m;
  }
  time.s = s;

  // detail the entries of the time object
  const timeValues = Object.entries(time);
  // create a text element for each array displaying the label and amount of time
  const Text = timeValues.map((entry, index) => {
    // with 3 items, show them at 25, 50, 75%
    // with 2, at 33, 66%
    const position = 90 / (timeValues.length + 1) * (index + 1);
    return ((
      <text
        x={position}
        y="50"
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

  // to animate the path, its length is necessary to animate it into view
  // as the path describes a circle, the length is equal to the perimeter of the circle
  const perimeter = 43 * 2 * 3.14;

  // use a variable ranging between 0-1 to show the colored circle atop the white one
  // animating the strokeDashoffset property until it is equal to strokeDasharray
  const progress = (1 - timeTotal / total);
  // use the same value for the circle element, to rotate it as the path is animated
  // 0-1 range --> 0-360 range
  const transform = `rotate(-${progress * 360}) translate(0 -43) rotate(${progress * 360})`;


  return (
    <React.Fragment>
      {/*
      aside from the output, display an additional element to change the label in the display
      component toggled and absolute positioned atop the display
      */}
      {
        isLabel &&
        <OutputLabel
          label={label}
          handleTimerLabelInput={handleTimerLabelInput} />

      }
      <svg viewBox="0 0 100 100" width="70%">
        {/* group to center the elements in the svg, and avoid the circle from being cropped out */}
        <g transform="translate(5 5)">

          {/* two overlapping path elements, showing the colored one atop the white one (the later an element is created, the higher its elevation, so to speak) */}
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

          {/* circle showing the progress */}
          <circle
            r="3.2"
            cx="45"
            cy="45"
            fill="#0088ff"
            transform={transform}
          />


          <text
            x="45"
            y="30"
            fill="#fff"
            alignmentBaseline="middle"
            textAnchor="middle"
            fontSize="0.35rem"
            onClick={handleTimerLabel}
          >
            {label}
          </text>
          {
            Text
          }
        </g>

      </svg>
    </React.Fragment>
  )
};

export default OutputDisplay;