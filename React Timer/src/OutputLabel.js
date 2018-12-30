import React from 'react';
import styled from 'styled-components';

// create a form with a simple structure
// absolute positioned in the center of the screen
const Label = styled.form`
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  padding: 1.2rem 0.8rem;
  box-shadow: 0 0 0 2px #0088ff;
  background: #03031b;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2;
`;
const LabelText = styled.label`
  color: #fff;
  font-size: 0.7rem;
  margin: 0.25rem 0;
`;

const LabelInput = styled.input`
  background: none;
  border: none;
  border-left: 2px solid #0088ff;
  border-radius: 1px;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 300;
  padding: 0.25rem 0.75rem;
  color: #fff;


`;
const OutputLabel = ({ label, handleTimerLabelInput }) => {
  return (
    <Label
      onSubmit={handleTimerLabelInput}>
      <LabelText>Timer's Label</LabelText>
      <LabelInput
        type="text"
        placeholder={label}
      />
    </Label>
  )
};

export default OutputLabel;