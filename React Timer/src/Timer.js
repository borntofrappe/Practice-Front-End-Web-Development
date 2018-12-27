import React, { Component } from 'react';
import styled from 'styled-components';
import TimerDisplay from './TimerDisplay';
import TimerDial from './TimerDial';

const TimerApp = styled.div`
  max-width: 380px;
  width: 90vw;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;
const TimerButton = styled.button`
  margin: 2rem 0 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  padding: 0.6rem;
  color: #5941f3;
  background: #5941f3;
  box-shadow: 0 1px 2px #5941f388;
`;
// main component rendered through index.js
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: [
        ['h', 0],
        ['m', 0],
        ['s', 0]
      ]
    };
  }


  render() {
    const { time } = this.state;
    return (
      <TimerApp>
        <TimerDisplay time={time} />
        <TimerDial />
        <TimerButton>
          <svg viewBox="0 0 100 100">
            <path d="M 40 30 l 30 20 l -30 20 Z" stroke="#eee" strokeWidth="7px" fill="currentColor" />
          </svg>
        </TimerButton>
      </TimerApp>
    );
  }
}

export default Timer;
