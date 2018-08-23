import React from 'react';
import './css/AppButtons.css';
// import the components 

// with a stateless Component, render one button per heading 
const AppButtons = (props) => {
  // console.log(props.headings);
  // loop through the array of headings and include a button element each
  let buttons = props.headings.map((heading) => <button key={heading}>{heading}</button>);
  // render the button elements
  return(
    <div className="AppButtons">
      {
        buttons
      }
    </div>
  );
}

export default AppButtons;
