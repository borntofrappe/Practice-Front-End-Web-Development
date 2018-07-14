import React from 'react';
import './FormField.css';
import InputField from './InputField';
import OptionField from './OptionField';
import RadioField from './RadioField';


// render an field depending on the value of props
const FormField = (props) => {
  /**
   * props.field is used to include the form elements required by the different stages of the application's flow 
   * displaying in sequence
   * the input field for first name, last name, email address, password
   * the options for favorite color
   * the radio buttons for favorite turtle
   * all input fields together
   */
  return(
    <div className="FormField">
      {
        props.field === "first-name"
        &&
        <InputField for="first-name" type="text" label="First Name"/>
      }
      {
        props.field === "last-name"
        &&
        <InputField for="last-name" type="text" label="Last Name"/>
      }

      {
        props.field === "email"
        &&
        <InputField for="email" type="email" label="Email Address"/>
      }

      {
        props.field === "password"
        &&
        <InputField for="password" type="password" label="Password"/>
      }

      {
        props.field === "favorite-color"
        &&
        <OptionField for="favorite-color" label="Favorite Color"/>
      }

      {
        props.field === "favorite-turtle"
        &&
        <RadioField for="favorite-turtle" label="Favorite Turtle"/>
      }

      {
      /* for the final screen display all input fields preceded by an error message explaining the mishap */
        props.field === "err"
        &&
        <div className="EntireForm">
          <div className="ErrorMessage">
            <p>Ehm... this is awkward 😅</p>
            <p>I forgot to register...</p>
            <p>Let's cut it short 👌</p>
          </div>

          <InputField for="first-name" type="text" label="First Name"/>
          <InputField for="last-name" type="text" label="Last Name"/>
          <InputField for="email" type="email" label="Email Address"/>
          <InputField for="password" type="password" label="Password"/>
          
        </div>
      }

    </div>

  );
}

export default FormField;