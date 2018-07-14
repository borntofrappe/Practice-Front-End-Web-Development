import React from 'react';
import './InputField.css';

// render an input field depending on the value of props
const InputField = (props) => {
  return(
    <div className="InputField">
      <label htmlFor={props.name}>{props.label}</label>
      <input required type={props.type} name={props.name} id={props.name} />
    </div>
  );
}

export default InputField;