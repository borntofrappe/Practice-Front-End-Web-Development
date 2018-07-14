import React from 'react';
import './RadioField.css';

// create an array with the values of the radio buttons
const radiosTurtles = ["Leo", "Mikey", "Donnie", "Ralph"];
// for each item of the array, create HTML markup nesting an input element and a connected label 
const radios = radiosTurtles.map(radioTurtle => {
  return(
    <div>
      <input type="radio" value={radioTurtle} id={radioTurtle} name="ninja-turtle"/>
      <label for={radioTurtle}>{radioTurtle}</label>
    </div>
  );
});

// render the options with the label and the different attributes dictacted by the props passed by th FormField component
// include all input elements of type radio, alongside a connected label through the HTML markup created with the mapped array
const RadioField = (props) => {

  return(
    <div className="RadioField">

      <label htmlFor={props.for}>{props.label}</label>
      { radios }
      
    </div>
  );
}

export default RadioField;