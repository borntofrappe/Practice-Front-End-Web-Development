import React from 'react';
import './InputField.css';

const InputField = (props) => {
  return(
    <div className="InputField">
      <label htmlFor={props.name}>{props.label}</label>
      <input required type={props.type} name={props.name} id={props.name} />
    </div>
  );
}

export default InputField;