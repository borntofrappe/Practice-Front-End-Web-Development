import React from 'react';
import './css/CardGrid.css';
// import link from the routing dependency
import { Link } from 'react-router-dom';

// with a stateless functional component, render a grid of cards based on the props passed as attributes
const CardGrid = (props) => {
  // loop through the array of cards and include an image wrapped in a link element (to allows for routing)
  let cards = props.cards.map((card) => {
    /* each card holds pertinent information in an object format
    card = {
      id,
      imageUrl,
      name
    }
    the id is used for the (unique) key attribute, and the data-key attribute of each image
    the url and name are used in the image element to specify the individual card

    !! in the link element, the **to** attribute refers to the path the page will take when clicking on the element itself
    (equivalent to href for anchor link elements)
    */
    return (
    <Link
      to="/details"
      key={card.id}
      className="Card"
      onClick={props.handleClick}>

      <img
        src={card.imageUrl}
        alt={card.name}
        data-key={card.id}/>

    </Link>);

  });

  // render the collection of link>img elements
  return(
    <div className="CardGrid">
      {
        cards
      }
    </div>
  );
}

export default CardGrid;