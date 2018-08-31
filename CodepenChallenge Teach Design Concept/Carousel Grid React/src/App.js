import React, { Component } from 'react';
import './css/App.css';
// import the components to be rendered in the page
import AppSlides from './AppSlides';
import AppControls from './AppControls';


// in the app stateful component, manage the state of the application and render the appropriate components
class App extends Component {
  constructor(props) {
    super(props);
    // for the state, include an array containing in each item an object for the content displayed in each slide
    // include also an integer to keep track of the current slide
    this.state = {
      current: 0,
      slides: [
        {
            slide: 0,
            title: 'Grid Based Carousel',
            description: 'How to? Here\'s the gist.',
            code: 'P.S. Feel free to tap around'
        },
        {
            slide: 1,
            title: 'For starters',
            description: 'Create a grid out of a wrapping container.',
            code: 'display: grid;'
        },
        {
            slide: 2,
            title: 'Moving on',
            description: 'Detail a single column which spans to cover the entirety of the container.',
            code: 'grid-template-columns: 100%;'
        },
        {
            slide: 3,
            title: 'Plot twist!',
            description: 'Specify how additional grid items should be added in new columns instead of new rows.',
            code: 'grid-auto-flow: column;'
        },
        {
            slide: 4,
            title: 'Almost there',
            description: 'Detail the width of the implicit columns to match the width of the only explicit column.',
            code: 'grid-auto-columns: 100%;'
        },
        {
            slide: 5,
            title: 'Finishing up',
            description: 'Hide horizontal overflow on the wrapping container.',
            code: 'overflow-x: hidden;'
        },
        {
            slide: 6,
            title: 'And that is all',
            description: 'Okay, there is plenty more behind this app... The basic idea is based on the mentioned grid properties though.'
        }
      ]
    }
    // bind the methods to move to the previous/next slide, either by tapping on the controls or on the left/right half of the card
    this.handleButton = this.handleButton.bind(this);
    this.handleCard = this.handleCard.bind(this);
  }

  handleButton(e) {
    // prevent bubbling up of the click event
    // otherwise the click will be heard by the card as well and trigger a handleButton with direction==='prev'
    e.stopPropagation();

    // retrieve the current slide being displayed
    let current = this.state.current;
    // retrieve the class of the pressed button
    // ! beware: by including styled-components, the buttons have two class, and retrieving the class name simply just won't do
    // check if the button **contains** the next or prev class and assign direction accordingly
    let direction = e.target.classList.contains("next") ? "next" : "prev";

    // handle the update based on current slide and direction
    this.handleUpdate(current, direction);
  }

  // similarly to the button, but referring to the card, handle the update, but depending on whether a click is heard on the left/right half of the card
  handleCard(e) {
    // target the card
    const app = document.querySelector(".App")
    // retrieve the width of the card (which can change with the size of the viewport)
    let cardWidth = app.offsetWidth;
    // retrieve the x coordinate of the left edge of the card
    let cardXCoor = app.getBoundingClientRect().left;
    // retrieve the z coordinate of the mouse
    let mouseXCoor = e.pageX;

    // retrieve the current slide
    let current = this.state.current;

    // if the card is pressed past half its width, handle the update passsing "next"
    if(mouseXCoor >= cardXCoor + cardWidth/2) {
      let direction = "next";
      this.handleUpdate(current, direction);
    }
    // else pass "prev"
    else {
      let direction = "prev";
      this.handleUpdate(current, direction);
    }

  }

  // create a function which, based on current value and direction, changes the slide being shown
  handleUpdate(current, direction) {
    // increment/ decrement current if in the safe range (as to always display a section)
    if(direction === "next" && current < 6) {
      current++;
    }
    else if(direction === "prev" && current > 0) {
      current--;
    }
    // retrieve the root element
    const root = document.querySelector(":root");
    // update the translate-slide custom property, which translates the section elements to show the rightful section in the wrapping container
    root.style.setProperty("--translate-slide", `${current * -100}%`);
    // update the state with the current value of current
    this.setState({
      current: current
    });
  }


  // render a component for each of the slides and one for the controls of the carousel
  render() {
    // each slide is responsible for a single component, which renders a section with relevant HTML elements
    // pass each object to the component as property
    let slides = this.state.slides.map((slide) =>
      <AppSlides
        key={slide.slide}
        slide={slide}
      />);


    return (
      // listen for a click event on the wrapping div and pass the handleButton method to the controls component
      <div className="App" onClick={this.handleCard}>

        { slides }
        <AppControls handleButton={this.handleButton}/>

      </div>
    );
  }
}

export default App;
