import React, { Component } from 'react';
import './css/App.css';
// import the object detailing the data
import data from './data';
/* import the components
- GridButtons for the section displaying the methods
- GridVisual for the section displaying the details
*/
import GridButtons from './GridButtons';
import GridVisual from './GridVisual';

// in a stateful component render the components responsible for the application and manage its state
class App extends Component {
  constructor(props) {
    super(props);
    // data refers to an array of objects, included in the state under state.data
    // index is used to render a specific visual depending on the button pressed
    this.state = {
      data: data,
      index: 0
    };
    // bind a method to update index according to the pressed button
    this.handleClick = this.handleClick.bind(this);
  } 

  // update the index, based on the id of the button pressed
  handleClick(e) {
    let index = +e.target.getAttribute("id");
    this.setState({
      index: index
    });
  }

  /*
  render the specified components
  include 
  - for the grid of buttons an array of objects, nesting the heading (used for the title) an the icon (used for the SVG)
    include also the method triggered by the nested buttons
  - for the grid of visuals the object in the array based on the button pressed
  */

  render() {
    return (
      <div className="App">

        <GridButtons 
          buttons={this.state.data.slice(1).map((item) => {
            return {
              heading: item.heading,
              icon: item.icon
            }
          })}
          handleClick={this.handleClick}
          />

        <GridVisual 
          data={this.state.data[this.state.index]} 
          />
          
      </div>
    );
  }
  
}

export default App;
