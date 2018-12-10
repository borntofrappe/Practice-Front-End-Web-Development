import React, { Component } from 'react';
// import the components used in the application
import Navigation from './Navigation';
import Hero from './Hero';
import Details from './Details';
import Sendoff from './Sendoff';


class App extends Component {
  constructor(props) {
    super(props);
    /* in the state include
    - an array of objects for the navigation bar
    - an array of strings for the hero (detailing the heading one word at a time)
    - an array of strings for the icons of the detail component
    - two booleans to show the remaining components on scroll
    */
    this.state = {
      links: [
        {
          name: 'react',
          url: 'https://reactjs.org'
        },
        {
          name: 'emotion',
          url: 'https://emotion.sh'
        },
        {
          name: 'spring',
          url: 'http://react-spring.surge.sh'
        }
      ],
      hero: [
        'giant',
        'bold',
        'heading'
      ],
      icons: [
        'thumbs',
        'volume',
        'crown',
        'book'
      ],
      showDetails: false,
      showSendoff: false
    }
    // bind the methods used to update the component structure
    this.showDetails = this.showDetails.bind(this);
    this.showSendoff = this.showSendoff.bind(this);
  }

  // for the first component, show it as soon as a scroll event is registered
  // toggle the boolean to show the detail component, remove the listener for the function
  // add the listener for the following component
  showDetails() {
    this.setState({
      showDetails: true
    });
    window.removeEventListener('scroll', this.showDetails);
    window.addEventListener('scroll', this.showSendoff);
  }

  // for the second component, show it when the scroll event reaches the bottom of the page
  showSendoff() {
    const html = document.documentElement;
    const { offsetHeight } = html;
    const { scrollY, innerHeight } = window;
    const topToBottom = scrollY + innerHeight;
    if (topToBottom >= offsetHeight) {
      this.setState({
        showSendoff: true
      });
      window.removeEventListener('scroll', this.showSendoff);
    }
  }

  // when the component is mounted, attach the function to show the detail component on scroll
  componentDidMount() {
    window.addEventListener('scroll', this.showDetails);
  }

  // render the components passing the required values
  render() {
    const { links, icons, hero, showDetails, showSendoff } = this.state;
    return (
      <div className="App">
        <Navigation links={links} />
        <Hero hero={hero} />
        {/* for the latter components use the ternary operator to show them on the basis of the boolean variable */}
        {
          showDetails &&
          <Details icons={icons} />
        }
        {
          showSendoff &&
          <Sendoff />
        }
      </div>
    );
  }
}

export default App;
