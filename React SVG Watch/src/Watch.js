import React, { Component } from 'react';
import styled from 'styled-components';
import Digits from './Digits';
import Hours from './Hours';
import Minutes from './Minutes';

const Dial = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  `;
class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      size: 250,
      colors: {
        theme: '#5941f3',
        text: '#fff'
      }
    };
  }

  componentDidMount() {
    // setInterval(() => {}, 1000);
  }

  render() {
    const { date, size, colors } = this.state;
    return (
      <Dial className="Watch" width={size} height={size}>
        <Digits digitNumber={4} size={size} colors={colors} />
        <Hours hours={date.getUTCHours()} size={size} colors={colors} />
        <Minutes minutes={date.getUTCMinutes()} size={size} colors={colors} />
        <circle cx={size / 2} cy={size / 2} r="5" fill={colors.theme} stroke={colors.text} strokeWidth="3px" />
      </Dial>
    );
  }
}

export default Watch;
