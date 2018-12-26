import React, { Component } from 'react';

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
    const transform = `translate(${margin} ${margin})`;
    return (
      <svg width={size + (margin * 2)} height={size + (margin * 2)}>
        <g transform={transform}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2.2}
            fill="none"
            stroke="#ddd"
            strokeWidth="2px" />

          <circle
            cx={size / 2}
            cy={size / 2}
            r="5"
            fill="#5941f3"
            stroke="#fff"
            strokeWidth="3px" />
        </g>
      </svg>
    );
  }
}

export default Watch;
