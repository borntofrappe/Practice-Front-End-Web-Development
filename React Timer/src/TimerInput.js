import React from 'react';
import styled from 'styled-components';
// import spring to animate the component
import { Spring } from 'react-spring';

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
/*
div displaying the contents of the two interfaces in a single column layout
horizontally centered
*/
const InputContainer = styled.div`
  max-width: 380px;
  width: 90vw;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const TimerInput = ({ input, time, handleDial, handleDialBack, handleTimerStart }) => {
  // render the display atop the dial and the button
  return (
    // wrap the component in a spring component, easily animating the component into view by describing CSS properties
    // css properties described in an object, passed in a `style` prop
    <Spring
      from={{ opacity: 0, transform: 'translateY(-2.5rem)' }}
      to={{ opacity: 1, transform: 'translateY(0)' }}
    >
      {
        ({ opacity, transform }) => (

          <InputContainer
            style={{ opacity, transform }}>
            {/*
            InputDisplay
            styled according to a boolean, which keeps track of the input's length
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
          </InputContainer>
        )
      }
    </Spring>
  )
};

export default TimerInput;