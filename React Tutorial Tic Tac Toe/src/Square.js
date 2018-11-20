import React from 'react';
import './css/Square.css';

// with a functional component render a button, detailing the value and method from the props object
// destructure the value retrieved from props in the argument of the function
const Square = ({ value, handleClick }) => {
  return (
    <button
      className="Square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default Square;