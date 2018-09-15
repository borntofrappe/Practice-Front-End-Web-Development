import React, { Component } from 'react';
import './css/App.css';

// import the components and the data array nesting one object for each error method
import data from './data';
import AppMonitor from './AppMonitor';
import AppSVG from './AppSVG';

// import styled components to style the button element
import styled from 'styled-components';
import { keyframes } from 'styled-components';

// include a keyframe animation
const fadeDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100vh) scale(1);
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// create a styled component for the button, immediately include on the page
// hide the element by default
// animate the button only when the class of animated is included
const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1rem;
  background: var(--color-monitor);
  box-shadow: 0 1px 5px var(--color-bg-d);
  color: var(--color-text);
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.1rem;

  animation: ${fadeDown} 0.7s 0.7s cubic-bezier(.25,-0.3,.5,1.5) both;

  &.not-allowed {
    cursor: not-allowed;
  }
`;

// render the components responsible for the visuals of the application and manage its state
class App extends Component {
  constructor(props) {
    super(props);
    /* include in the state
    - the array responsible for the error messages
    - an integer for the actual object in the array to be included in the monitor
    - a string for the text of the button element
    */
    this.state = {
      data: data,
      index: 0,
      button: 'send request'
    }

    // bind the method to update the heading/description and the text of the button as well
    this.handleClick = this.handleClick.bind(this);
  }

  // as the components are mounted retrieve the length of the SVG line and update the custom property
  componentDidMount() {
    let svgLine = document.querySelector("svg line");
    let length = svgLine.getTotalLength();

    let root = document.documentElement;
    root.style.setProperty("--stroke-dash", length);
  }


  // through the handle click method select an object at random in the array and trigger a re-render
  handleClick() {
    let svg = document.querySelector("svg");

    if(!svg.classList.contains("animated")) {

      let heading = document.querySelector("h2");
      let paragraphContainer = document.querySelector("div.Paragraph");
      let button = document.querySelector("button");

      let length = this.state.data.length;
      let index = Math.floor(Math.random()*length);

      this.setState({
        index: index,
        button: 'sending request'
      });

      heading.classList.remove("animated");

      paragraphContainer.classList.remove("animated");

      // start the animation of the button + monitor (while preventing further clicks on the button itself)
      svg.classList.add("animated");
      button.classList.add("not-allowed");

      // after 4s, roughly after the svg animation is completed
      // include the error message in the button and begin the animation for the heading and paragraph
      let timeoutID = setTimeout(() => {


        heading.classList.add("animated");
        paragraphContainer.classList.add("animated");

        this.setState({
          button: 'err err'
        });
        clearTimeout(timeoutID);

        // set another timeout, of roughly 2s, after which the button is restored to its original text
        let secTimeoutID = setTimeout(() => {
          this.setState({
            button: 'try again'
          });
          svg.classList.remove("animated");
          button.classList.remove("not-allowed");
          clearTimeout(secTimeoutID);
        }, 2500);

      }, 4000);

    }
    else {
      console.log("contains");
    }

  }

  render() {
    // retrieve the object chosen at random and the string for the button
    let monitorMessage = this.state.data[this.state.index];
    let button = this.state.button;

    return (
      // render a component for the monitor atop a component for the SVG and a button
      <div className="App">
        {/* include the object referring to the error message chosen at random in the monitor component */}
        <AppMonitor monitorMessage={monitorMessage}/>

        <AppSVG />

        {/* on click trigger the handle click button */}
        <Button className="AppButton" onClick={this.handleClick}>{button}</Button>

      </div>
    );
  }
}

export default App;
