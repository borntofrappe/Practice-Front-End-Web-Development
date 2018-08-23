import React, { Component } from 'react';
import './css/App.css';
// import the components 
// AppData as an object detailing the information required for the project
import AppData from './AppData';
// AppButtons as the grid responsible for the buttons
import AppButtons from './AppButtons';
// AppVisuals as the grid responsible for the visual matching the selected button
import AppVisual from './AppVisual';

// in a stateful component render the components responsible for the application and manage its state
class App extends Component {
  constructor(props) {
    super(props);
    // AppData refers to an array of objects
    // included in the state under state.data
    this.state = {
      data: AppData,
      section: 2
    };
  } 

  /*
  render the specified components
  pass to the grid of buttons an array of only the headers, except for the first array item (which introduces introductory content)
  pass to the visual of content the array of object as a whol
  */

  render() {
    return (
      <div className="App">
        <AppButtons headings={this.state.data.slice(1).map((item) => item.heading)}/>
        <AppVisual data={this.state.data} section={this.state.section} />
      </div>
    );
  }
}

export default App;
