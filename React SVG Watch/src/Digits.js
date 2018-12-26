import React from 'react';

const Digits = ({ digitNumber, size, colors }) => {
  const sizePadding = size / 20;
  const sizeDigits = size - sizePadding * 2;

  const baseDigit = 12 / digitNumber;
  const digits = [];
  for (let i = baseDigit; i <= 12; i += baseDigit) {
    digits.push(i);
  }

  const text = digits.map(digit => {
    const transform = `rotate(${digit * 360 / 12}) translate(0, -${sizeDigits / 2}) rotate(-${digit * 360 / 12})`;

    return (<text
      key={digit}
      x={sizeDigits / 2}
      y={sizeDigits / 2}
      fill={colors.text}
      opacity={0.8}
      fontSize="0.75rem"
      textAnchor="middle"
      alignmentBaseline="middle"
      transform={transform}
    >
      {digit}
    </text>);
  });

  return (
    <g transform={`translate(${sizePadding} ${sizePadding})`}>
      <circle
        cx={sizeDigits / 2}
        cy={sizeDigits / 2}
        r={(sizeDigits / 2.3)}
        fill="none"
        strokeWidth="1px"
        opacity="0.9"
        stroke={colors.text} />

      {
        text
      }
    </g>
  );
}

export default Digits;