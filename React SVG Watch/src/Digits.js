import React from 'react';

const Digits = ({ howMany, spread, distance }) => {
  // center the group element
  const translate = `translate(${spread}, ${spread})`;


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
        opacity="1"
        fontSize="0.8rem"
        textAnchor="middle"
        alignmentBaseline="middle"
        transform={rotate}
      >
        {digit}
      </text>
    );

  });

  return (
    <g transform={translate}>
      {
        DigitsText
      }
    </g>
  );
}

export default Digits;