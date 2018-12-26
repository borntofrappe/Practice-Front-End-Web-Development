import React from 'react';

// digits component, taking in the number of digits to show and mapping the digits around the clock
// for instance 4 digits --> 3, 6, 9, 12, positioned at 3, 6, 9, 12 o'click respectively
const Digits = ({ howMany, distance }) => {
  // describe the digits to be displayed around the clock
  const baseDigit = 12 / howMany;
  const digits = [];
  for (let i = baseDigit; i <= 12; i += baseDigit) {
    digits.push(i);
  }
  // describe the text elements rotated according to the digit number (12 at the very top, 3 at the very right and so forth repeating the structure of an analog clock)
  const DigitsText = digits.map(digit => {
    const rotate = `rotate(${digit * 360 / 12}) translate(0, -${distance}) rotate(-${digit * 360 / 12})`;

    return (
      <text
        key={digit}
        x="0"
        y="0"
        fill="#ccc"
        opacity="0.5"
        fontWeight="400"
        fontSize="0.85rem"
        textAnchor="middle"
        alignmentBaseline="middle"
        transform={rotate}
      >
        {digit}
      </text>
    );

  });

  return (
    <g>
      {
        DigitsText
      }
    </g>
  );
}

export default Digits;