import React, { Component } from 'react';
import './css/App.css';
// import the object storing the data regarding upcoming tennis matches
import CourtMatches  from './CourtMatches';
import data from './data';
import styled from 'styled-components';

// style the heading and subheading through styled components
const Title = styled.h1`
    font-size: calc(2rem + 1vw);
    text-transform: capitalize;
`;
const Subtitle = styled.h2`
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
    margin: 0.5rem 0 1rem;
`;

// render the components responsible for the visuals of the application and manage its state
class App extends Component {
  constructor(props) {
    super(props);
    // in the state, incude the object detailing tennis matches per court
    this.state = {
      data: data
    }
  }

  // in a wrapping container render multiple instances of the CourtMatches component, each describing the tennis matches held at a particular court
  render() {
    // include in each component the object describing the court
    let courtMatches = data.map((matches) => <CourtMatches key={matches.id} matches={matches} />);
    return (
      // render the tennis matches after introductory elements
      <div className="App">
        <Title>today's tennis</Title>
        <Subtitle>US Open</Subtitle>
        {
          courtMatches
        }
      </div>
    );
  }
}

export default App;
