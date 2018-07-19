import React from 'react';
import './CardSingle.css';

const CardSingle = (props) => {
  return(
    <div className="CardSingle">
      <div className="Single"></div>
      <div className="Details">
        <h2>{props.name}</h2>
        {
          props.details.map(detail => <p>{detail}</p>)
        }
      </div>
    </div>
  );
}

export default CardSingle;