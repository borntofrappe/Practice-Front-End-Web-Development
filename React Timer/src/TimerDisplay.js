import React from 'react';
import styled from 'styled-components';

const Display = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ffffff55;
`;
const Time = styled.h2`
  flex-grow: 1;
  display: flex;
  font-size: 2rem;
  font-weight: 500;
`;
const TimeUnit = styled.span`
  flex-grow: 1;
  width: 0;
  margin: 0 0.75rem;
  position: relative;

  &:after {
    content: '${props => props.suffix}';
    font-size: 0.8rem;
    margin-left: 0.15rem;
  }
`;

const TimeButton = styled.button`
  color: #fff;
  width: 70px;
  height: 50px;
  padding: 0.3rem;
`;
function formatTime(time) {
  return time >= 10 ? time : `0${time}`;
}
const TimerDisplay = ({ time }) => {
  const timeElements = time.map(time => <TimeUnit key={time[0]} suffix={time[0]}>{formatTime(time[1])}</TimeUnit>);
  return (
    <Display>
      <Time>
        {
          timeElements
        }
      </Time>
      <TimeButton>
        <svg viewBox="0 0 100 100">
          <path d="M 50 37.5 l 25 25" strokeWidth="5px" stroke="currentColor" fill="none" />
          <path d="M 50 62.5 l 25 -25" strokeWidth="5px" stroke="currentColor" fill="none" />
          <path d="M 40 20 h 50 v 60 h -50 l -20 -30 Z" strokeWidth="5px" stroke="currentColor" fill="none" />
        </svg>
      </TimeButton>
    </Display>
  )
};

export default TimerDisplay;