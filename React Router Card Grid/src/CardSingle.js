import React from 'react';
import './CardSingle.css';


const CardSingle = (props) => {
  let imgURL = props.card.imageUrl,
      name = props.card.name;  

  return(
    <div className="CardSingle">
      <div className="Single" >
        <img src={imgURL} alt={name}/>
      </div>
      <div className="Details">
        <h2>{name}</h2>
        {/* <p>Type {props.card.types[0]}</p> */}
        {/* <p>Attack {props.card.attacks[0].name}</p> */}
      </div>
    </div>
  );
}

export default CardSingle;