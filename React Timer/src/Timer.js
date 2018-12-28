import React, { Component } from 'react';
import styled from 'styled-components';
import TimerDisplay from './TimerDisplay';
import TimerDial from './TimerDial';
import TimerTimer from './TimerTimer';

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

const TimerControls = styled.div`
 display: flex;
 align-items: center;
 margin-top: 1.5rem;
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
      timeTotal: 0,
      input: '',
      isTimer: false,
      isPlaying: false
    };
    this.handleDial = this.handleDial.bind(this);
    this.handleDialBack = this.handleDialBack.bind(this);
    this.handleTimerStart = this.handleTimerStart.bind(this);
    this.handleTimerToggle = this.handleTimerToggle.bind(this);
    this.handleTimerAdd = this.handleTimerAdd.bind(this);
  }

  updateTime(input) {
    const inputTime = input.padStart(6, 0);
    let h = parseInt(inputTime.substring(0, 2), 10);
    let m = parseInt(inputTime.substring(2, 4), 10);
    let s = parseInt(inputTime.substring(4));
    const timeTotal = h * 60 * 60 + m * 60 + s;

    const time = {
      h,
      m,
      s
    };
    this.setState({
      time,
      timeTotal
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

  startTimer() {
    this.intervalID = setInterval(() => {
      let { timeTotal } = this.state;
      timeTotal -= 1;
      this.setState({
        timeTotal: timeTotal
      })
      if (timeTotal === 0) {
        clearInterval(this.intervalID);
        this.setState({
          isTimer: false,
          input: ''
        })
      }
    }, 1000);
  }

  handleTimerStart() {
    this.setState({
      isTimer: true,
      isPlaying: true
    })

    this.startTimer();
  }
  handleTimerToggle() {
    const { isPlaying } = this.state;
    if (isPlaying) {
      clearInterval(this.intervalID);
    }
    else {
      this.startTimer();
    }
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  handleTimerAdd() {
    const { timeTotal } = this.state;
    this.setState({
      timeTotal: timeTotal + 60
    })

  }

  render() {
    const { time, input, isTimer, isPlaying, timeTotal } = this.state;

    return (
      <TimerApp>
        {
          isTimer ?
            <React.Fragment>
              <TimerTimer timeTotal={timeTotal} handleTimerAdd={this.handleTimerAdd}/>
              <TimerControls>
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
              </TimerControls>
            </React.Fragment>

            :

            <React.Fragment>
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
            </React.Fragment>

        }
      </TimerApp>
    );
  }
}

export default Timer;
