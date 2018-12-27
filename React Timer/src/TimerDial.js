import React from 'react';
import styled from 'styled-components';

const Dial = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 85%;
  grid-gap: 1.8rem 1rem;
`;

const Digit = styled.button`
  font-size: 2rem;
  &:nth-of-type(1) {
    grid-row: 4/5;
    grid-column: 1/-1;
  }
`;

const TimerDial = () => {
  const Digits = [];
  for (let i = 0; i < 10; i += 1) {
    Digits.push(<Digit key={i}>{i}</Digit>);
  }
  return (
    <Dial>
      {
        Digits
      }
    </Dial>
  )
};

export default TimerDial;