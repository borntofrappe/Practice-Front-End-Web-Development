import React, { Component } from 'react';
import './css/App.css';
import AppOutput from './AppOutput';
import AppInput from './AppInput';


/*
nest in the main stateful component:
AppInput, where the visitor types in  a message
AppOutput, where the typed message is eventually sent
*/
class App extends Component {
  render() {
    return (
      <div className="App">
        <AppInput />
        <AppOutput />
      </div>
    );
  }
}

export default App;
