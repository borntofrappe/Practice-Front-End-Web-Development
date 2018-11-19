import React from 'react';
import './css/Square.css';

// with a functional component render a button, detailing the value and method from the props object
const Square = props => {
  return (
    <button
      className="Square"
      onClick={props.handleClick}
    >
      {props.value}
    </button>
  );
}

export default Square;