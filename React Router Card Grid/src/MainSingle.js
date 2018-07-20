import React, { Component } from 'react';
import './MainSingle.css';
import Header from './Header';
import CardSingle from './CardSingle';
import { Link } from 'react-router-dom';

/*
in the main component render: 
- by default, components responsible for the header and grid of cards
- on click, components responsible for an updated header and a single card
*/ 

class MainSingle extends Component {

  render() {
    return (
      <div className="MainSingle">
        <Link to="/" onClick={this.props.removeId}>
        <span></span>
        Back to grid
        </Link>
        <Header title="pokémon details" />
        <CardSingle card={this.props.card}/>
      </div>
    );
  }
}

export default MainSingle;
