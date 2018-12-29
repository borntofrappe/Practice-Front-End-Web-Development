import React from 'react';
import styled from 'styled-components';

// display the time and the button removing the last digit side by side
const Input = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ffffff11;
  transition: color 0.2s ease-out;
  // style the color of the text (and the svg element through the currentColor property) based on the props boolean
  color: ${props => props.isInput ? '#ffffff' : '#ffffff55'};
`;

// display the span elements side by side, in a heading stretching to occupy as much space as available
const InputTime = styled.h2`
  flex-grow: 1;
  display: flex;
  font-size: 2rem;
  font-weight: 500;
`;
const InputSpan = styled.span`
  flex-grow: 1;
  width: 0;
  margin: 0 0.75rem;
  position: relative;

  // add the short label for hours, minutes, seconds by accessing the suffix argument passed through props
  &:after {
    content: '${props => props.suffix}';
    font-size: 0.8rem;
    margin-left: 0.15rem;
  }
`;

const InputButton = styled.button`
  width: 70px;
  height: 50px;
  padding: 0.3rem;
`;

// function formatting the time, to always show two digits (zero-padded values)
function formatTime(time) {
  return time >= 10 ? time : `0${time}`;
}


const InputDisplay = ({ isInput, time, handleDialBack }) => {
  // create three span elements out of the hours, minutes and seconds depicted in the time object
  /* structured as follows
  {
    h,
    m,
    s
  }
  */
  const InputPair = Object.entries(time);
  const InputSpans = InputPair.map(pair => (
    <InputSpan
      key={pair[0]}
      suffix={pair[0]}
    >
      {formatTime(pair[1])}
    </InputSpan>
  )
  );

  return (
    <Input
      isInput={isInput}
    >
      <InputTime>
        {
          InputSpans
        }
      </InputTime>

      {/* draw the style button with path elements */}
      <InputButton
        onClick={handleDialBack}
      >
        <svg
          viewBox="0 0 100 100"
        >
          <path
            d="M 50 37.5 l 25 25"
            strokeWidth="5px"
            stroke="currentColor"
            fill="none"
          />

          <path
            d="M 50 62.5 l 25 -25"
            strokeWidth="5px"
            stroke="currentColor"
            fill="none"
          />

          <path
            d="M 40 20 h 50 v 60 h -50 l -20 -30 Z"
            strokeWidth="5px"
            stroke="currentColor"
            fill="none" />
        </svg>
      </InputButton>
    </Input>
  )
};

export default InputDisplay;