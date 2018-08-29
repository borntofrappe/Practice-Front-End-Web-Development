import React from 'react';
import './css/Main.css';
import Header from './Header';
import CardGrid from './CardGrid';

/*
in the main component render
- the components responsible for the header
- the component responsible for the grid of cards
*/
const Main = (props) => {
  return(
    <div className="Main">
      {/*
      the header component displays h1 and h2 elements based on the specified properties
      the grid component displays a grid of cards, based on the cards array (clickable cards, specifying the handleClick method)
      */}

      <Header title="pokémon cards" subtitle="back from 1999"/>

      <CardGrid cards={props.cards} handleClick={props.handleClick}/>
    </div>
  );
};

export default Main;
