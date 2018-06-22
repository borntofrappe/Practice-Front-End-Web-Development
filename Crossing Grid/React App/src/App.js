import React, { Component } from 'react';
import './App.css';
import IntroductoryText from './IntroductoryText';
import FlowerBags from './FlowerBags';


class App extends Component {
  render() {
    return (
      <div className="App">
        <IntroductoryText />
        <FlowerBags />
      </div>
    );
  }
}

export default App;
