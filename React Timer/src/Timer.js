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
      input: '',
      isTimer: false,
      isPlaying: false
    };
    this.handleDial = this.handleDial.bind(this);
    this.handleDialBack = this.handleDialBack.bind(this);
    this.handleTimerStart = this.handleTimerStart.bind(this);
    this.handleTimerToggle = this.handleTimerToggle.bind(this);
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

  handleTimerStart() {
    this.setState({
      isTimer: true,
      isPlaying: true
    })
  }
  handleTimerToggle() {
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  render() {
    const { time, input, isTimer, isPlaying } = this.state;

    let { s: seconds, m: minutes, h: hours } = time;
    while (seconds >= 60) {
      seconds -= 60;
      minutes += 1;
    }
    while (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }
    const timeTimer = {
      hours,
      minutes,
      seconds
    }
    return (
      <TimerApp>
        {
          isTimer ?
            <>
              <h2>Thanks for hopping by</h2>
              <p>
                The timer ought to begin right now
                <br />
                Just need to figure a stylisg way :)
                <br />
              </p>
              <p>Coming soon, a timer for:</p>
              <ul>
                {
                  Object.entries(timeTimer).map(entry => <li key={entry[0]}>{entry[1]} {entry[0]}</li>)
                }
              </ul>
              <TimerButton onClick={this.handleTimerToggle}>
                {
                  isPlaying ?
                    <svg viewBox="0 0 100 100">
                      <rect x="30" y="30" width="10" height="40" stroke="#eee" strokeWidth="6px" fill="currentColor" />
                      <rect x="60" y="30" width="10" height="40" stroke="#eee" strokeWidth="6px" fill="currentColor" />
                    </svg>
                    :
                    <svg viewBox="0 0 100 100">
                      <path d="M 40 30 l 30 20 l -30 20 Z" stroke="#eee" strokeWidth="7px" fill="currentColor" />
                    </svg>
                }
              </TimerButton>
            </>
            :
            <>
              <TimerDisplay isInput={input.length !== 0} time={time} handleDialBack={this.handleDialBack} />
              <TimerDial handleDial={this.handleDial} />
              {
                input &&
                <TimerButton onClick={this.handleTimerStart}>
                  <svg viewBox="0 0 100 100">
                    <path d="M 40 30 l 30 20 l -30 20 Z" stroke="#eee" strokeWidth="7px" fill="currentColor" />
                  </svg>
                </TimerButton>
              }
            </>

        }
      </TimerApp>
    );
  }
}

export default Timer;
