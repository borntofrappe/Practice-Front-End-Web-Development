import React, { Component } from 'react';
import './css/App.css';

// import the data array nesting one object for each error method
import data from './data';

// import the components
import AppMonitor from './AppMonitor';
import AppSVG from './AppSVG';

// import styled components to style the button element
import styled from 'styled-components';
// import keyframes to create animations with the same library
import { keyframes } from 'styled-components';

// include the animation for the button (repeated for the monitor)
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


// styled BUTTON
// hide the element by default
// include a class changing the cursor value to visually remark how the button cannot be pressed (this happens when the animation for the request being sent is ongoing)
const Button = styled.button`
  border: none;
  border-radius: 5px;
  background: var(--color-monitor);
  box-shadow: 0 1px 5px var(--color-bg-d);
  padding: 0.75rem 1rem;

  color: var(--color-text);
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.1rem;

  animation: ${fadeDown} 0.7s 0.7s cubic-bezier(.25,-0.3,.5,1.5) both;

  &.not-allowed {
    cursor: not-allowed;
  }
`;


class App extends Component {
  constructor(props) {
    super(props);
    /* include in the state
    - the array responsible for the error messages
    - an integer for the index of the array, to target a single array item and include it in the monitor
    - a string for the text of the button element, altered as the button is pressed
    */
    this.state = {
      data: data,
      index: 0,
      button: 'send request'
    }

    // bind the method to update the heading/description and the text of the button, as to send the request
    this.handleClick = this.handleClick.bind(this);
  }

  // as the components are mounted retrieve the length of the SVG line and update the custom property
  // this to animate the stroke-dashoffset property by the exact amount required to fully hide/show the svg line
  componentDidMount() {
    let svgLine = document.querySelector("svg line");
    let length = svgLine.getTotalLength();

    let root = document.documentElement;
    root.style.setProperty("--stroke-dash", length);
  }

  // the handle click method is responsible for emulating a request to a server
  /** the logic is as follows
   * target the svg (which is to be animated through a class of .animated)
   * check if the svg has a class of animated (added to emulate the request, removed at the end of such a visual) (this is used as a gate, as the code which follows will run only if the svg doesn't have such a class)
   * if the svg doesn't have a class of animated, proceed animating the page as to emulate the request
   */
  handleClick() {
    let svg = document.querySelector("svg");

    if(!svg.classList.contains("animated")) {
      // target the elements which needs updating
      let heading = document.querySelector("h2");
      let paragraphContainer = document.querySelector("div.Paragraph");
      let button = document.querySelector("button");

      // immediately remove the class of .animated from the heading and div responsible for the paragraphs (this to hide the two elements if already displayed in the page)
      heading.classList.remove("animated");
      paragraphContainer.classList.remove("animated");

      // compute a random integer to select a random object in the array of objects
      let length = this.state.data.length;
      let index = Math.floor(Math.random()*length);

      // immediately update the state with the new index and changing the string responsible for the button to visualize the beginning of the animation
      this.setState({
        index: index,
        button: 'sending request'
      });


      // start the animation of the SVG line, creating a connection between button and monitor
      svg.classList.add("animated");
      // alter the cursor property of the button to visually remark how the button cannot be pressed while the request is being processed
      button.classList.add("not-allowed");


      // after 4s, as the svg animation is complete, introduce the elements responsible for the error message
      let timeoutID = setTimeout(() => {

        // animate the h2 and div element to show the heading and paragraphs
        heading.classList.add("animated");
        paragraphContainer.classList.add("animated");

        // update the button to visualize how sending the request returned an error
        this.setState({
          button: 'err err'
        });
        // clear the first timeout
        clearTimeout(timeoutID);

        // set another timeout, of roughly 2s, after which the button is restored to its original text
        let secTimeoutID = setTimeout(() => {
          this.setState({
            button: 'try again'
          });

          // remove the class of .animated on the svg, which hides it from view once again
          svg.classList.remove("animated");
          // remove the not-allowed value for the cursor of the button
          button.classList.remove("not-allowed");
          // clear the second timeout
          clearTimeout(secTimeoutID);
        }, 2500);

      }, 4000);

    }

  }


  render() {
    // retrieve the object chosen at random and the string for the button
    let monitorMessage = this.state.data[this.state.index];
    let button = this.state.button;

    return (
      // render a component for the monitor atop a component for the SVG line and a (styled) button
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
