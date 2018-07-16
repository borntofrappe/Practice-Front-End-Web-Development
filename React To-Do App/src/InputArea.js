import React from 'react';
import './InputArea.css';

/*
in the stateless component representing the input area: 
- include a wrapping form elemet which considers the handleSubmit method defined in the parent component
  - include an input 
  - include a button
As the functionality of the input area is fulfilled solely through the form and its onSubmit property, the input and butto elements are included rather barebone
*/
const InputArea = (props) => {
  return (
    <form className="InputArea" onSubmit={props.handleSubmit}>
      <input type="text" placeholder="New task"/>
      <button>+</button>
    </form>
  );
} 
export default InputArea;
