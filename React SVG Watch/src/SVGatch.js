import React, { Component } from 'react';
import Digits from './Digits';
import Hours from './Hours';
import Minutes from './Minutes';

class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      size: 225,
      margin: 25
    };
  }

  render() {
    const { date, size, margin } = this.state;
    const translate = `translate(${margin} ${margin})`;
    const center = `translate(${size / 2} ${size / 2})`;
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

            <Digits
              howMany={4}
              spread={size / 2}
              distance={size / 2} />

            <Hours
              hours={date.getHours()}
              spread={size / 2}
              size={size / 4.5}
            />

            <Minutes
              minutes={date.getMinutes()}
              spread={size / 2}
              size={size / 3.5}
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

export default Watch;
