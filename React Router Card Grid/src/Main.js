import React, { Component } from 'react';
import './Main.css';
import Header from './Header';
import CardGrid from './CardGrid';

/*
in the main component render components responsible for the header and grid of cards
on click, redirect toward the single view component through routing
*/ 

class Main extends Component {
  
  render() {
    return (
      <div className="Main">
        {/*
        the header component displays h1 and h2 elements based on the attributes included
        the grid component displays div cards with CSS grid, below the headers
        */}

        <Header title="pokémon cards" subtitle="back from 1999"/>
        <CardGrid cards={this.props.cards} handleClick={this.props.handleClick}/>
      </div>
    );
  }
}

export default Main;
