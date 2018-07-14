import React, { Component } from 'react';
import './App.css';
import SignUpForm from './SignUpForm';

// render in a single div the component responsible for the sign up form, in all its possible configurations
class App extends Component {
  render() {
    return (
      <div className="App">
        <SignUpForm />
      </div>
    );
  }
}

export default App;
