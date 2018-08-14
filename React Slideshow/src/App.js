import React, { Component } from 'react';
import './css/App.css';
// import the components 
import Slideshow from './Slideshow';
import Controls from './Controls';
// import the array of objects making up the slides
import { slides } from './Slides';

// in a stateful component render the components responsible for the application and manage its state
class App extends Component {
  // in the state, include a single field for the number of the slide
  // in the constructor still, bind two functions to increment and decrement the state variable respectively
  // bind one additional function to achieve the same feat with arrow keys instead of buttons
  constructor(props) {
    super(props);
    this.state = {
      slide: 0
    };
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.handleStroke = this.handleStroke.bind(this);
  } 

  // add an event listener on the entire window once the components are included in the page
  // listen for a keydown event, at which point call a function to update the state, if need be
  componentDidMount() {
    window.addEventListener("keydown", this.handleStroke);
  }

  // create a function which updates the state if the key pressed matches one of the chosen one
  handleStroke(e) {
    // e.keycode is an integer
    // left facing arrow: 37
    // right facing arrow: 39
    let keyCode = e.keyCode;
    if(keyCode === 37) {
      this.prevSlide();
    }
    else if (keyCode === 39) {
      this.nextSlide();
    }
  }

  // for the two functions, retrieve the single field from the state and increment/ decrement its values
  // alter the value if within the chosen range (from 0 to the length of the slide array minus one (used to access the last element of the array))
  prevSlide() {
    let slide = this.state.slide;
    if(slide > 0) {
      this.setState({
        slide: slide - 1
      });
    }
  }
  nextSlide() {
    let slide = this.state.slide;
    if(slide < slides.length - 1) {
      this.setState({
        slide: slide + 1
      });
    }
  }

  /*
  render a component which displays a slide depending on the array item 
  together, render two buttons to change the number of the slide
  */

  render() {
    return (
      <div className="App">
        <Slideshow slide={slides[this.state.slide]}/>
        <Controls prevSlide={this.prevSlide} nextSlide={this.nextSlide}/>
      </div>
    );
  }
}

export default App;
