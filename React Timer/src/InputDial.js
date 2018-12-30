import React from 'react';
import styled from 'styled-components';

// in the dial show the digits from 0 to 9, in a grid
const Dial = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 85%;
  grid-gap: 1.8rem 1rem;
  margin-bottom: 1.25rem;
`;

// for the digits, these are included through buttons styled to change their appearance on hover/focus
const Digit = styled.button`
  font-size: 2rem;
  transition: all 0.2s ease-out;
  font-weight: 600;
  position: relative;
  color: #ffffff55;
  // push the first digit, 0, to the very bottom of the timer
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
    // transition occurring only as the mouse hovers in the element
    transition-delay: 0.1s;
    transform:  translate(-50%, -50%) scale(1);
    opacity: 0;
  }
`;

const InputDial = ({ handleDial }) => {
  // create an array of ten items, including the digits from 0 to 9 in the styled button
  const Digits = [];
  for (let i = 0; i < 10; i += 1) {
    Digits.push(
      <Digit
        key={i}
        onClick={handleDial}
      >
        {i}
      </Digit>
    );
  }
  return (
    <Dial>
      {
        Digits
      }
    </Dial>
  )
};

export default InputDial;