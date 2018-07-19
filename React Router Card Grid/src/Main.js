import React, { Component } from 'react';
import './Main.css';
import Header from './Header';
import CardGrid from './CardGrid';

/*
in the main component render: 
- by default, components responsible for the header and grid of cards
- on click, components responsible for an updated header and a single card
*/ 

class Main extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="Main">
        {/* the header component displays h1 and h2 elements based on the attributes included */}
        <Header title="pokémon cards" subtitle="back in 1999" />
        {/* the grid component displays 25+ cards with CSS grid, below the headers */}
        <CardGrid cards={[1,2,3,4,5,6,7,8,9,10,11,12]} />
      </div>
    );
  }
}

export default Main;
