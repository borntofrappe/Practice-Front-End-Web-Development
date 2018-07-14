import React from 'react';
import './InputField.css';

// render an input field with the label and the different attributes dictacted by the props passed by th FormField component
const InputField = (props) => {

  /*
  props holds
    props.for, included for the attribute of the label with the same name, as well as the name and id attributes of the connected input element (for instance _first-name_)
    props.label, representing the informatie text of the label
    props.type, for the type of the input (text, email, password)
  */
  return(
    <div className="InputField">
      <label htmlFor={props.for}>{props.label}</label>
      <input required type={props.type} name={props.for} id={props.for} />
    </div>
  );
}

export default InputField;