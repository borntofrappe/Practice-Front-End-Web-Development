import React from 'react';
import './CardGrid.css';
import { Link } from 'react-router-dom';

// with a stateless functional component, render a grid of cards based on the props passed as attributes
const CardGrid = (props) => {
  return(
    <div className="CardGrid">
      {
        props.cards.map(
          (card) => 
          <Link className="Card" key={card.id} to="/details" onClick={props.handleClick}>
            <img src={card.imageUrl} alt={card.name} data-key={card.id}/>
          </Link>
        )
      }
    </div>
  );
}

export default CardGrid;