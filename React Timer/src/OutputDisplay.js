import React from 'react';
import styled from 'styled-components';

const Output = styled.div`
  margin: 2rem 0;
`;

const OutputTime = styled.h2`
  font-weight: 300;
  letter-spacing: 0.15rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid #fff;
  border-radius: 4px;
`;
const OutputSpan = styled.span`
  &:not(:nth-last-child(1)):after {
    content: ':';
  }
`;

// show the countdown timer in a heading element, with each set of time in a sraprate span
const OutputDisplay = ({ timeTotal, handleTimerAdd }) => {
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
  const time = {
    hours,
    minutes,
    seconds
  }

  // based on the time values, show one span for each component
  // show only the necessary digits (for instance showing only seconds if the timer is less than one minute long)
  const OutputSpans = Object.entries(time).map(entry => {

    return ((
      <OutputSpan
        key={entry[0]}
      >
        {entry[1]}
      </OutputSpan>
    ));
  });

  return (

    <Output>
      <OutputTime>
        {
          OutputSpans
        }
      </OutputTime>
    </Output>
  )
};

export default OutputDisplay;