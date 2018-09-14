import React, { Component } from 'react';
import './css/App.css';

// import the components and the data array nesting one object for each error method
import data from './data';
import AppMonitor from './AppMonitor';
import AppSVG from './AppSVG';

// render the components responsible for the visuals of the application and manage its state
class App extends Component {
  constructor(props) {
    super(props);
    /* include in the state
    - the array responsible for the error messages
    - an array detailing the different text assumed by the buttons
    - an integer to display each line in the button
    */
    this.state = {
      data: data,
      index: 0,
      button: [
        'send request',
        'sending',
        'hoppla'
      ],
      clicked: 0
    }

    // bind the method to update the heading/description
    this.handleClick = this.handleClick.bind(this);
  }

  // through the handle click method select an object at random in the array and trigger a re-render
  handleClick() {
    let clicked = this.state.clicked;
    clicked = (clicked === 2) ? clicked = 0 : clicked + 1;


    let length = this.state.data.length;
    let index = Math.floor(Math.random()*length);

    this.setState({
      index: index,
      clicked: clicked
    });
  }

  render() {

    let data = this.state.data[this.state.index];
    let button = this.state.button[this.state.clicked];
    console.log(data, button);

    return (
      // render a component for the monitor atop a component for the SVG and a button
      <div className="App">

        <AppMonitor data={data}/>

        <AppSVG />

        <button className="AppButton" onClick={this.handleClick}>{button}</button>

      </div>
    );
  }
}

export default App;
