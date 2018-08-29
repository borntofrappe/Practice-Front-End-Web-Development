import React from 'react';
import './css/MainSingle.css';
import Header from './Header';
import CardSingle from './CardSingle';
// import link from the routing library
import { Link } from 'react-router-dom';

/*
in the main single component render:
- a link allowing to move back to the card grid
- a header detailing the single view
- a component detailing the card and connected information
*/

const MainSingle = (props) => {

    return (
      <div className="MainSingle">
        {/* when pressing on the "back to grid" link, redirect toward the root path  */}
        <Link
          to="/"
          onClick={props.handleClick}>
            <span></span>
            Back to grid
        </Link>

        <Header title="pokémon details"/>

        <CardSingle card={props.card}/>
      </div>
    );
}

export default MainSingle;
