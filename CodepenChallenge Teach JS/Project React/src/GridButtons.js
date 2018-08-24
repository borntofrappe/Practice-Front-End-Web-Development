import React from 'react';
import './css/GridButtons.css';
// import styled components 
import styled from 'styled-components';

// style the buttons to remove default styles
// include hover and active state, plus some margin to better nestle the buttons in the section
const Button = styled.button`
  margin: 2px;
  background: none;
  border: none;
  opacity: 0.8;
  transition: all 0.2s ease-out;

  &:hover {
    opacity: 1;
  }
  &:active {
    transform: scale(1.1);
  }
`;

// with a stateless component, render one button per heading 
const GridButtons = (props) => {
  // loop through the array objects
  // include a button for each object
  // include an SVG element for each button (through dangerouslySetInnerHTML, which allows to include HTML syntax directly)
  let buttons = props.buttons.map((button, index) => {
    return <Button 
              // increment the id by 1 to have it properly refer to the objects representing the buttons
              // the first object is indeed for presentational purposes
              key={index + 1} 
              id={index + 1} 
              title={button.heading} 
              dangerouslySetInnerHTML={{__html: button.icon}} 
              onClick={props.handleClick}>
            </Button>;
  });

  // render the button elements
  return(
    <div className="GridButtons">
      {
        buttons
      }
    </div>
  );
  
}

export default GridButtons;
