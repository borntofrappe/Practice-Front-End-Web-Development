import React from 'react';
import styled from 'styled-components';
// import spring to animate the component
import { Spring } from 'react-spring';

// import the display components
import OutputDisplay from './OutputDisplay';

// fabricate the round button nesting the SVG for the start of the timer
const TimerButton = styled.button`
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
const OutputContainer = styled.div`
  max-width: 380px;
  width: 90vw;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const OutputControls = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-column-gap: 2rem;
  grid-template-columns: repeat(3, 80px);
  align-items: center;
  justify-items: center;
`;

const TimerOutput = ({ total, timeTotal, label, isLabel, isPlaying, handleTimerToggle, handleTimerNew, handleTimerAdd, handleTimerReset, handleTimerLabel, handleTimerLabelInput }) => {
  // render the display atop a series of buttons enabling the project's functionalities
  return (
    // animate the output similarly to the input, but with an opposing vertical transition
    <Spring
      from={{ opacity: 0, transform: 'translateY(2.5rem)' }}
      to={{ opacity: 1, transform: 'translateY(0)' }}
    >
      {
        ({ opacity, transform }) => (


          <OutputContainer
            style={{ opacity, transform }}>
            {/*
            OutputDisplay
            timeTotal, describing the time being counted down
            and total, the unchanged total (to compute the relative progress)
            label and connected methods to change the name of the label by way of a small popup
             */}
            <OutputDisplay
              total={total}
              timeTotal={timeTotal}
              label={label}
              isLabel={isLabel}
              handleTimerLabel={handleTimerLabel}
              handleTimerLabelInput={handleTimerLabelInput}
            />

            <OutputControls>

              {/* button to go back to the input UI */}
              <button
                onClick={handleTimerNew}
              >
                New Timer
              </button>

              {/* button to toggle the timer  */}
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

              {/* button to either add 1 minute or reset the timer, based on whether the timer is paused */}
              {
                isPlaying ?
                  <button
                    onClick={handleTimerAdd}
                  >
                    Add +1:00
                  </button>

                  :

                  <button
                    onClick={handleTimerReset}
                  >
                    Reset Timer
                  </button>

              }

            </OutputControls>

          </OutputContainer>
        )
      }

    </Spring>
  );
};

export default TimerOutput;