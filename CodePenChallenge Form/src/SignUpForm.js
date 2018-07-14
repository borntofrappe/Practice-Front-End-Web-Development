import React, { Component } from 'react';
import './SignUpForm.css';
import FormField from './FormField';

// display different fields depending on the flow of the application 
// unidirectional flow from the first field for the first name to the last field for the favorite turtle
// show each component one at a time, until the last one, following which show all the components with input type text, email and password together

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    // in the state include 
    // a key for the field, used to show different components throughout the application's flow
    // a key for the class name of the overarching SignUpForm container, to animate the component in and out of view 
    this.state = {
      field: 'first-name',
      interval: 1000,
      className: 'SignUpForm AnimateForm'
    }
    // bind the click element for the button 
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    /* when the button is clicked
    store in two variables the values of the state
    */
    let field = this.state.field;
    let interval = this.state.interval;

    // unless the field key is equal to 'err' (which is included when the application reaches the final screen)
    if(field !== 'err') {
      // prevent the default behavior
      e.preventDefault();

      // change the className as to immediately transition the SignUpForm out of view
      this.setState({
        className: 'SignUpForm'
      });
      // following an interval equal to the amount specified in the state key with the same name
      let intervalID = setTimeout(() => {
        // update the key of field to move the application toward the following component
        // increment the interval for the last transition, to emulate the processing of data
        switch(field) {
          /*
          the field progressively assumes the strings mathcing the following flow
          - first name
          - last name
          - email address
          - password
          - fav color
          - fav turtle

          by default, any case not matching these values is redirected toward the 'err' string, which is used to display the final screen
          */ 
          case 'first-name':
            field = 'last-name';
            break;
          case 'last-name':
            field = 'email';
            break;
          case 'email':
            field = 'password';
            break;
          case 'password':
            field = 'favorite-color';
            break;
          case 'favorite-color':
            field = 'favorite-turtle';
            break;
          default:
            field = 'err';
            interval = 1800;
            break;
        }
        // update the state to match the new values
        // update class name to animate the SignUpForm into view
        this.setState({
          field: field,
          className: 'SignUpForm AnimateForm',
          interval: interval
        });

        clearInterval(intervalID);
      }, interval);
    }
    
  }

  /*
  for the SignUpForm display 
  - an informative header
  - a FormField component dictated by the state, showing the different fields one at a time and then together
  - a button to "move" the application through the designed steps
  */
  render() {
    return(
    
    <form className={this.state.className}>
      <h1>Sign up</h1>

      <FormField field={this.state.field}/>

      <button type="submit" onClick = {this.handleClick}>Submit</button>
    </form>

    );
  }
} 

export default SignUpForm;