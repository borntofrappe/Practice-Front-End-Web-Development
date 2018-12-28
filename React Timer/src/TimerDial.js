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
  transition: all 0.2s ease-out;
  font-weight: 600;
  position: relative;
  color: #ffffff55;
  &:nth-of-type(1) {
    grid-row: 4/5;
    grid-column: 1/-1;
  }
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    transform:  translate(-50%, -50%) scale(0);
    background: #fff;
    border-radius: 50%;
  }
  &:hover, &:focus {
    color: #fff;
  }
  &:hover:before, &:focus:before {
    transition: all 0.2s ease-out;
  transition-delay: 0.1s;
    transform:  translate(-50%, -50%) scale(1);
    opacity: 0;
  }
`;

const TimerDial = ({ handleDial }) => {
  const Digits = [];
  for (let i = 0; i < 10; i += 1) {
    Digits.push(<Digit key={i} onClick={handleDial}>{i}</Digit>);
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