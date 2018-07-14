import React from 'react';
import './OptionField.css';

// create an array with the values of the possible options
const optionsColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];
// include an option element for each item of the array
const options = optionsColors.map(optionColors => <option value={optionColors}>{optionColors}</option>);

// render the options with the label and the different attributes dictacted by the props passed by th FormField component
// include all option elements created with the mapped array
const OptionField = (props) => {

  return(
    <div className="OptionField">
      <label htmlFor={props.for}>{props.label}</label>
      <div className="Select">
        <select name={props.for} id={props.for}>

          { options }
        
        </select>
      </div>
    </div>
  );
}

export default OptionField;