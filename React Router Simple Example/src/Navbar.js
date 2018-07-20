import React from 'react';
import './Navbar.css';
// import the link element
import { Link } from 'react-router-dom'

// based on props.navlinks, which is an array of strings, render link elements for each separate array item
const Navbar = (props) => {
    return(
        <nav className="Navbar">
        {
            props.navlinks.map((navlink, index) => <Link to={navlink} key={index}>{navlink}</Link>)
        }
        </nav>
    );    
}

export default Navbar;
