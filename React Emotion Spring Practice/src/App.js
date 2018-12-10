import React, { Component } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import Details from './Details';
import Sendoff from './Sendoff';

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
    this.showDetails = this.showDetails.bind(this);
    this.showSendoff = this.showSendoff.bind(this);
  }
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
  showDetails() {
    this.setState({
      showDetails: true
    });
    window.removeEventListener('scroll', this.showDetails);
    window.addEventListener('scroll', this.showSendoff);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.showDetails);
  }

  render() {
    const { links, icons, hero, showDetails, showSendoff } = this.state;
    return (
      <div className="App">
        <Navigation links={links} />
        <Hero hero={hero} />
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
