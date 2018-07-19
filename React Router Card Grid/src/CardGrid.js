import React from 'react';
import './CardGrid.css';

// with a stateless functional component, render a grid of cards based on the props passed as attributes
const CardGrid = (props) => {
  return(
    <div className="CardGrid">
      {
        props.cards.map(
          (card, index) => 
          <div className="Card" key={index}>
            <img src={card}/>
          </div>
        )
      }
    </div>
  );
}

export default CardGrid;