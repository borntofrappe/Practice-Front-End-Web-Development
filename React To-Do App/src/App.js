import React, { Component } from 'react';
import './App.css';
import InputArea from './InputArea';
import OutputArea from './OutputArea';

// in a single stateful component, include two stateless components fr the input and output area
// include the input area after the output one to have the input of type="text" be displayed below the div showing the different list items 
class App extends Component {
  render() {
    return (
      <div className="App">
        <OutputArea />
        <InputArea />
      </div>
    );
  }
}

export default App;
