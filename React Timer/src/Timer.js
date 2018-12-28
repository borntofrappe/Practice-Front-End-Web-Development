import React, { Component } from 'react';
import styled from 'styled-components';
import TimerDisplay from './TimerDisplay';
import TimerDial from './TimerDial';

const TimerApp = styled.div`
  max-width: 380px;
  width: 90vw;
  margin: 2rem auto;
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
  color: #1c1cdd;
  background: #1c1cdd;
  box-shadow: 0 1px 5px -2px #1c1cdd;
  &:hover {
    transition: box-shadow 0.2s ease-out;
    box-shadow: 0 1px 5px 0px #1c1cdd;
  }
`;
// main component rendered through index.js
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        h: 0,
        m: 0,
        s: 0
      },
      input: ''
    };
    this.handleDial = this.handleDial.bind(this);
    this.handleDialBack = this.handleDialBack.bind(this);
  }

  updateTime(input) {
    const inputTime = input.padStart(6, 0);
    let h = inputTime.substring(0, 2);
    let m = inputTime.substring(2, 4);
    let s = inputTime.substring(4);


    const time = {
      h: parseInt(h, 10),
      m: parseInt(m, 10),
      s: parseInt(s, 10)
    };
    this.setState({
      time
    })
  }

  handleDial(e) {
    const { textContent } = e.target;
    let { input } = this.state;
    const { length } = input;
    if (textContent === '0' && length === 0) {
      return;
    }
    if (length < 6) {
      input += textContent;
      this.setState({
        input
      })
      this.updateTime(input);
    }
  }
  handleDialBack(e) {
    let { input } = this.state;
    const { length } = input;
    if (length > 0) {
      input = input.substring(0, length - 1);
      this.setState({
        input
      })
    }
    this.updateTime(input);
  }

  render() {
    const { time, input } = this.state;
    return (
      <TimerApp>
        <TimerDisplay isInput={input.length !== 0} time={time} handleDialBack={this.handleDialBack} />
        <TimerDial handleDial={this.handleDial} />
        {
          input &&
          <TimerButton>
            <svg viewBox="0 0 100 100">
              <path d="M 40 30 l 30 20 l -30 20 Z" stroke="#eee" strokeWidth="7px" fill="currentColor" />
            </svg>
          </TimerButton>
        }
      </TimerApp>
    );
  }
}

export default Timer;
