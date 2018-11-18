import React from 'react';

// with a functional component render a button with a specified class and the method allowing to change its value according to the state's logic
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