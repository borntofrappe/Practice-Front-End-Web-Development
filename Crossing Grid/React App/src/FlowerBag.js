import React from 'react';
import './FlowerBag.css';


const FlowerBag = () => {
    let spanElements = [];
    for(let i = 0; i < 120; i++) {
        spanElements.push(<span key={i}></span>);
    }
    return(
        <div className="FlowerBag">
            {spanElements}
        </div>
    );
};

export default FlowerBag;
