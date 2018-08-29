import React from 'react';
import './css/CardSingle.css';
// import styled components
import styled from 'styled-components';

const Name = styled.h2`
  text-transform: uppercase;
  font-size: calc(2rem + 1vw);
  max-width: 350px;
  line-height: 2;
`;
const Attack = styled.p`
  margin: 1.5rem 0 2.2rem;
  border-left: 4px solid var(--color-txt);
  font-size: 1rem;
`;
const Rarity = styled.h2`
  text-transform: capitalize;
  font-size: 1rem;
  text-align: right;
  font-weight: 300;
`;

// with a stateless functional component, render a single card, detailing its information on the side
const CardSingle = (props) => {
  /* props.card refers to an object detailing information in the following format
  card = {
    imageUrl,
    name
  }
  */
  let card = props.card;

  // render an image referring to the single card, next to a container detailing the image's content
  return(
    <div className="CardSingle">

      <div className="Single" >
        <img src={card.imageUrl} alt={card.name}/>
      </div>

      <div className="Details">
        <Name>{card.name}</Name>

        {
          card.attacks &&
          card.attacks.map((attack, i) => <Attack key={i}>{attack.name}</Attack>)
        }

        <Rarity>{card.rarity}</Rarity>
      </div>

    </div>
  );
}

export default CardSingle;