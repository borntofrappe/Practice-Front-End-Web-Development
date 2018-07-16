import React from 'react';
import './InputArea.css';

const InputArea = (props) => {
  return (
    <form className="InputArea" onSubmit={props.handleInput}>
      <input type="text" placeholder="New task"/>
      <button>+</button>
    </form>
  );
} 
export default InputArea;
