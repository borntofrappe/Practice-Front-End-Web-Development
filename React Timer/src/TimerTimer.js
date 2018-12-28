import React from 'react';
import styled from 'styled-components';

const TimerOutput = styled.div`
  margin: 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 2;
`;

const TimerAdd = styled.button`
  margin: 1rem 0;
`;
const Output = styled.h2`
  font-weight: 300;
  letter-spacing: 0.15rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid #fff;
  border-radius: 4px;
`;
const OutputElement = styled.span`
  &:not(:nth-last-child(1)):after {
    content: ':';
  }
`;

function formatTime(time) {
  return time >= 10 ? time : `0${time}`;
}

const TimerTimer = ({ timeTotal, handleTimerAdd }) => {
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

  return (
    <TimerOutput>
      <Output>

        {
          Object.entries(time).map(entry => {
            if (entry[1] === 0 && entry[0] !== 'seconds') {
              return '';
            }
            return (<OutputElement key={entry[0]}>{formatTime(entry[1])}</OutputElement>);
          })
        }
      </Output>
      <TimerAdd onClick={handleTimerAdd}>+1:00</TimerAdd>

    </TimerOutput>
  )
};

export default TimerTimer;