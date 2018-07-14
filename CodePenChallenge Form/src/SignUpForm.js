import React, { Component } from 'react';
import './SignUpForm.css';
import InputField from './InputField';

// display different input field(s) depending on the flow of the application 
// unidirectional flow from the first input field for the first name to the last input field
class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: 'fname'
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {

    e.preventDefault();
    let inputName = this.state.inputName;
    switch(inputName) {
      case 'fname':
        inputName = 'lname';
        break;
      case 'lname':
        inputName = 'email';
        break;
      default:
        inputName = 'err';
        break;
    }
    this.setState({
      inputName: inputName
    });
  }


  render() {
    return(
    
    <form className="SignUpForm">
      <h1>Sign up</h1>

      {
        this.state.inputName === "fname" 
      && 
        <InputField name="fname" label="First Name" type="text" />
      }

      {
        this.state.inputName === "lname" 
      && 
        <InputField name="lname" label="Last Name" type="text" />
      }

      {
        this.state.inputName === "email" 
      && 
        <InputField name="email" label="Email Address" type="email" />
      }
      {
        this.state.inputName === "err"
      &&
        <div className="ErrorForm">
          <p>Ehm...forgot to register</p>
          <p>Gimme everything at once</p>
          <InputField name="fname" label="First Name" type="text" />
          <InputField name="lname" label="Last Name" type="text" />
          <InputField name="email" label="Email Address" type="email" />
        </div>
      }

      <button type="submit" onClick = {this.handleClick}>Submit</button>
    </form>
    );
  }
} 

export default SignUpForm;