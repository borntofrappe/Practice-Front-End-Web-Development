import React, { Component } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import Details from './Details';
import Sendoff from './Sendoff';
// import { Spring } from 'react-spring';

class App extends Component {
  constructor(props) {
    super(props);
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
      ]
    }
  }
  render() {
    const { links } = this.state;
    return (
      <div className="App">
        <Navigation links={links} />
        <Hero />
        <Details />
        <Sendoff />
      </div>
    );
  }
}

export default App;
