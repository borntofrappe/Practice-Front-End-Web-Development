import React from 'react';
import './css/AppInput.css';
import styled, { keyframes} from 'styled-components';

// animation for the label 
const pointDown = keyframes`
  0%, 50% {
    transform: translate(-50%, 0);
  }
  40% {
    transform: translate(-50%, 10px);
  }
`;

// styled component for the label
// including an arrow pointing downwards through the animation
const Label = styled.label`
  line-height: 2;
  margin: 1rem 0;
  padding: 0.3rem 0;
  position: relative;

  &:before {
    position: absolute;
    content: "";
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    border-top: 0.5rem solid #fff;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
    opacity: 0.5;
    animation: ${pointDown} 5s ease-in infinite;
  }
`;

// styled component for the input element
const Input = styled.input`
  margin: 1rem 0;
  background: none;
  border: none;
  border-radius: 2px;
  border: 2px solid #ffffff22;
  padding: 0.5rem 1rem;
  color: #fff;

  &::placeholder {
    font-family: inherit;
    color: inherit;
    opacity: 0.5;
`;

/* in a stateless component render a label and the controlled input element */
const AppInput = (props) => {
  return(
    <div className="AppInput">
      <Label>Type your or anybody else's name</Label>
      <Input type="text" placeholder="Tim" value={props.input} onChange={props.handleInput}/>
    </div>
  );
}

export default AppInput;
