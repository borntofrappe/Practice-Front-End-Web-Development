import React, { Component } from 'react';
import styled from 'styled-components';

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: ${props => props.primary ? 700 : 300};
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }


  render() {
    const { date } = this.state;
    return (
      <div className="App">
        <Heading>{date}</Heading>
        <Heading primary>{date}</Heading>
      </div>
    );
  }
}

export default App;
