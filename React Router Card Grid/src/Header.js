import React from 'react';
import './Header.css';

// with a stateless functional component render h1 and h2 elements, depending on the values retrieved from props

const Header = (props) => {
  return(
    <div className="Header">
      {/* render header elements with the values found in props, if existing */}
      {
        props.title 
        &&
        <h1>{props.title}</h1>
      }
      {
        props.subtitle 
        &&
        <h3>{props.subtitle}</h3>
      }
    </div>
  );
}

export default Header;