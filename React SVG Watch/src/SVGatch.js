import React, { Component } from 'react';
import Digits from './Digits';
import Hours from './Hours';
import Minutes from './Minutes';
import Seconds from './Seconds';

// main component rendered through index.js
class SVGatch extends Component {
  constructor(props) {
    super(props);
    // in the state detail a date Object, later updated every second
    // additionally define root variables for the size of the SVG and the margin allowing to nest SVG element inside, without cropping
    // following d3's margin convention
    this.state = {
      date: new Date(),
      size: 225,
      margin: 25
    };
  }

  // when the components are mounted set up an interval to update the date object every second
  componentDidMount() {
    this.interval = setInterval(() => {
      const date = new Date();
      this.setState({
        date
      });
    }, 1000);
  }

  render() {
    // destructure the variables present in the state
    const { date, size, margin } = this.state;
    /* define transform values to translate the SVG elements (per d3's margin convention)
    and to center the elements */
    const translate = `translate(${margin} ${margin})`;
    const center = `translate(${size / 2} ${size / 2})`;
    /* within the SVG Element, define the following elements/components
    circle, for the outer most ring
    Digits, for text elements distributed around the ring
    Hours, for the hour's hand
    Minutes, for the minute's hand
    Seconds, for the ticks representing the seconds and a marker highlighting the current second
    */
    return (
      <svg width={size + (margin * 2)} height={size + (margin * 2)}>
        <g transform={translate}>
          <g transform={center}>
            <circle
              cx="0"
              cy="0"
              r={size / 2.3}
              fill="none"
              stroke="#ccc"
              strokeWidth="2px" />

            {/*
              howMany: the number of digits to display around the clock
              distance: where the text elements are pushed
            */}
            <Digits
              howMany={4}
              distance={size / 2} />

            {/*
              hours: the current hours
              size: the size of the hand
            */}
            <Hours
              hours={date.getHours()}
              size={size / 4.5}
            />

            {/*
              minutes: the current minutes
              size: the size of the hand
            */}
            <Minutes
              minutes={date.getMinutes()}
              size={size / 3.5}
            />

            {/*
              seconds: the current seconds
              size: the size of the hand
              spread: the starting point of each tick
            */}
            <Seconds
              seconds={date.getSeconds()}
              size={size / 30}
              spread={size / 2.7}
            />

            <circle
              cx="0"
              cy="0"
              r="5"
              fill="#5941f3"
              stroke="#fff"
              strokeWidth="3px" />
          </g>
        </g>
      </svg>
    );
  }
}

export default SVGatch;
