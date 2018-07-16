import React from 'react';
import './InputArea.css';

const InputArea = () => {
  return (
    <form className="InputArea">
      <input type="text" placeholder="New task"/>
      <button>+</button>
    </form>
  );
} 
export default InputArea;
