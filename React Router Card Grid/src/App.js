import React, { Component } from 'react';
import './App.css';
import Main from './Main';

// in the app stateful component, render main, which shows different markup structures based on React Router
class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
