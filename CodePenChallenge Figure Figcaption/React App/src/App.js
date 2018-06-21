import React, { Component } from 'react';
import './App.css';
import Comic from './Comic';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Comic />
      </div>
    );
  }
}

export default App;
