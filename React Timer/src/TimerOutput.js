import React from 'react';
import styled from 'styled-components';

// import the display components
import OutputDisplay from './OutputDisplay';

// fabricate the round button nesting the SVG for the start of the timer
const TimerButton = styled.button`
  margin: 2rem 0 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  padding: 0.6rem;
  color: #1c1cdd;
  background: #1c1cdd;
  box-shadow: 0 1px 5px -2px #1c1cdd;
  &:hover {
    transition: box-shadow 0.2s ease-out;
    box-shadow: 0 1px 5px 0px #1c1cdd;
  }
`;


const TimerOutput = ({ timeTotal, isPlaying, handleTimerToggle, handeTimerAdd }) => {
  // render the display atop a button to toggle the timer
  return (
    <React.Fragment>
      <OutputDisplay
        timeTotal={timeTotal}
      />

      <TimerButton
        onClick={handleTimerToggle}
      >
        {
          isPlaying ?

            <svg
              viewBox="0 0 100 100"
            >
              <rect
                x="30"
                y="30"
                width="10"
                height="40"
                stroke="#eee"
                strokeWidth="6px"
                fill="currentColor"
              />
              <rect
                x="60"
                y="30"
                width="10"
                height="40"
                stroke="#eee"
                strokeWidth="6px"
                fill="currentColor"
              />
            </svg>

            :

            <svg
              viewBox="0 0 100 100"
            >
              <path
                d="M 40 30 l 30 20 l -30 20 Z"
                stroke="#eee"
                strokeWidth="7px"
                fill="currentColor"
              />
            </svg>
        }
      </TimerButton>

    </React.Fragment>
  );
};

export default TimerOutput;