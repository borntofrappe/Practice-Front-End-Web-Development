import React from 'react';
import styled from 'styled-components';

// import the display and dial components
import InputDisplay from './InputDisplay';
import InputDial from './InputDial';

// fabricate the round button nesting the SVG for the start of the timer
const TimerButton = styled.button`
  margin: 2rem 0 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  padding: 0.6rem;
  color: #0088ff;
  background: #0088ff;
  box-shadow: 0 1px 5px -2px #0088ff;
  &:hover {
    transition: box-shadow 0.2s ease-out;
    box-shadow: 0 1px 5px 0px #0088ff;
  }
`;


const TimerInput = ({ input, time, handleDial, handleDialBack, handleTimerStart }) => {
  // render the display atop the dial and the button
  return (
    <React.Fragment>
      {/* InputDisplay styled according to a boolea, which keeps track of the input's length
      displaying the value described in the time object
      removing the last included digit through the handleDialBack function
       */}
      <InputDisplay
        isInput={input.length !== 0}
        time={time}
        handleDialBack={handleDialBack}
      />


      {/* InputDial simply collecting the value of the button pressed, through the handleDial function */}
      <InputDial
        handleDial={handleDial}
      />

      {/* show the button only if there is at least one digit in the display */}
      {
        input &&
        // start the timer when clicking the button
        <TimerButton onClick={handleTimerStart}>
          <svg viewBox="0 0 100 100">
            <path
              d="M 40 30 l 30 20 l -30 20 Z"
              stroke="#eee"
              strokeWidth="7px"
              fill="currentColor"
            />
          </svg>
        </TimerButton>

      }
    </React.Fragment>
  )
};

export default TimerInput;