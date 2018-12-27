import React, { Component } from 'react';

// main component rendered through index.js
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiemer: 0
    };
  }


  render() {
    return (
      <div className="Timer">
      </div>
    );
  }
}

export default Timer;
