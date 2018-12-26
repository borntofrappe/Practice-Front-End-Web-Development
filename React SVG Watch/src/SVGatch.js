import React, { Component } from 'react';
import Digits from './Digits';
import Hours from './Hours';
import Minutes from './Minutes';
import Seconds from './Seconds';

class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      size: 225,
      margin: 25
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const date = new Date();
      this.setState({
        date
      });
    }, 1000);
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
              distance={size / 2} />

            <Hours
              hours={date.getHours()}
              size={size / 4.5}
            />

            <Minutes
              minutes={date.getMinutes()}
              size={size / 3.5}
            />

            <Seconds
              seconds={date.getSeconds()}
              spread={size / 2.7}
              size={size / 30}
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
