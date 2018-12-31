import React, { Component } from 'react';

import TimerInput from './TimerInput';
import TimerOutput from './TimerOutput';

/*
div displaying the contents of the two interfaces in a single column layout
horizontally centered
*/

// main component rendered through index.js
class Timer extends Component {
  constructor(props) {
    super(props);
    /* in the state specify the following
    - input, keeping track of the digits included through the dial in a string
    - time, keeping track of the number of hours, minutes and seconds in an object
    - timeTotal, keeping track of the number of seconds specified through the time object
    - total, to save the total number of seconds and use it to reset the timer to this value
    - label, a string describing the text shown in the output
    - isTimer, to show the input or output interface
    - isPlaying, to toggle between play and pause in the output interface
    - isLabel, to toggle the label component
    */
    this.state = {
      input: '',
      time: {
        h: 0,
        m: 0,
        s: 0
      },
      timeTotal: 0,
      total: 0,
      label: 'Label',
      isTimer: false,
      isPlaying: false,
      isLabel: false
    };

    // bind the functions to update the state and enable the timer's functionalities
    this.handleDial = this.handleDial.bind(this);
    this.handleDialBack = this.handleDialBack.bind(this);
    this.handleTimerStart = this.handleTimerStart.bind(this);
    this.handleTimerToggle = this.handleTimerToggle.bind(this);
    this.handleTimerAdd = this.handleTimerAdd.bind(this);
    this.handleTimerNew = this.handleTimerNew.bind(this);
    this.handleTimerReset = this.handleTimerReset.bind(this);
    this.handleTimerLabel = this.handleTimerLabel.bind(this);
    this.handleTimerLabelInput = this.handleTimerLabelInput.bind(this);
  }

  // function updating time and TimeTotal, on the basis of the 6 letters top string
  updateTime(input) {
    // based on the input string, create a six-letter long string (adding 0 at the beginning)
    const inputTime = input.padStart(6, 0);
    // separate the hours, minutes and seconds
    let h = parseInt(inputTime.substring(0, 2), 10);
    let m = parseInt(inputTime.substring(2, 4), 10);
    let s = parseInt(inputTime.substring(4));
    // compute the total
    const timeTotal = h * 60 * 60 + m * 60 + s;

    const time = {
      h,
      m,
      s
    };

    // update the object and the integer
    this.setState({
      time,
      timeTotal,
      total: timeTotal
    })
  }

  // function handling a press on the dial's buttons
  handleDial(e) {
    // retrieve the button's text element (0-9 value)
    const { textContent } = e.target;
    // retrieve the input from the state
    let { input } = this.state;
    const { length } = input;
    // if the button pressed is 0 and the input doesn't already have a value, preemptively exit the function
    if (textContent === '0' && length === 0) {
      return;
    }
    // if the input is less than 6 characters long (hhmmss), add the digit to the input string and update the state
    if (length < 6) {
      input += textContent;
      this.setState({
        input
      })
      // update the time and timeTotal
      this.updateTime(input);
    }
  }

  // function handling a press on the dial's back button
  handleDialBack(e) {
    // retrieve the input from the state
    let { input } = this.state;
    const { length } = input;
    // if input has at least a character, remove the last digit
    if (length > 0) {
      input = input.substring(0, length - 1);
      // update the state
      this.setState({
        input
      })
    }
    // update the time and timeToal
    this.updateTime(input);
  }


  // function starting the timer
  startTimer() {
    // start a timer from timeTotal, decreasing its value one second at a time
    this.intervalID = setInterval(() => {
      let { timeTotal } = this.state;
      timeTotal -= 1;
      this.setState({
        timeTotal: timeTotal
      })
      // when reaching 0, clear the interval
      if (timeTotal === 0) {
        clearInterval(this.intervalID);
      }
    }, 1000);
  }

  // function handling a press on the button starting the timer
  handleTimerStart() {
    // update the UI showing the output interface and the pause button
    this.setState({
      isTimer: true,
      isPlaying: true
    })
    // start the timer
    this.startTimer();
  }

  // function handling a press on the button pausing/starting the timer
  handleTimerToggle() {
    // based on the isPlaying boolean stop the interval or start it anew
    const { isPlaying } = this.state;
    if (isPlaying) {
      clearInterval(this.intervalID);
    }
    else {
      this.startTimer();
    }
    // update the UI of the button
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  // function handling a press on the +1:00 button
  handleTimerAdd() {
    // add a minute to the total
    const { timeTotal, total } = this.state;
    this.setState({
      timeTotal: timeTotal + 60,
      total: total + 60
    })
  }

  // function handling a press on the new timer button
  handleTimerNew() {
    // stop the ongoing interval, if there's one
    clearInterval(this.intervalID);
    // reset the input and update the state showing the input UI
    const input = '';
    this.setState({
      isTimer: false,
      input
    })
    // update the time with the now empty input
    this.updateTime(input)
  }

  // function handling a press on the reset button
  handleTimerReset() {
    // stop the ongoing interval
    clearInterval(this.intervalID);
    // retrieve the input value
    const { input } = this.state;

    // update the timer with the old existing value and start the timer
    this.updateTime(input);
    this.handleTimerStart();
  }

  // function handling a press on the label text
  handleTimerLabel() {
    this.setState({
      isLabel: true
    })
  }
  // function handling input in the label component
  handleTimerLabelInput(e) {
    e.preventDefault();
    // update the label with the input value
    const { value: label } = e.target.querySelector('input');
    if (label) {
      this.setState({
        label,
        isLabel: false
      })
    }
  }

  render() {
    // destructure the necessary information from the state
    const { input, time, isTimer, isPlaying, timeTotal, total, label, isLabel } = this.state;

    // based on the boolean show the input or output component
    return (
      <div>

        {
          isTimer ?


            /* TimerOutput
            displaying the countdown timer through **timeTotal**
            showing the pause/play button according to **isPlaying**
            handling functionalities such as pausing/starting the timer, adding a minute, resetting and removing the timer, adding and changing the label */
            < TimerOutput
              total={total}
              timeTotal={timeTotal}
              label={label}
              isPlaying={isPlaying}
              isLabel={isLabel}
              handleTimerToggle={this.handleTimerToggle}
              handleTimerNew={this.handleTimerNew}
              handleTimerAdd={this.handleTimerAdd}
              handleTimerReset={this.handleTimerReset}
              handleTimerLabel={this.handleTimerLabel}
              handleTimerLabelInput={this.handleTimerLabelInput}
            />

            :

            /* TimerInput
            adding the digits to **input**
            displaying the digits as per **time**
            handling functionalities such as adding digits, removing them, starting the timer */

            <TimerInput
              input={input}
              time={time}
              handleDial={this.handleDial}
              handleDialBack={this.handleDialBack}
              handleTimerStart={this.handleTimerStart}
            />
        }
      </div>
    );
  }
}

export default Timer;
