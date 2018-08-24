import React from 'react';
import './css/AppButtons.css';
// import the components 
import styled from 'styled-components';

const Button = styled.button`
  margin: 2px;
  background: none;
  border: none;
  opacity: 0.7;
  transition: all 0.2s ease-out;

  &:hover {
    opacity: 1;
  }
  &:active {
    transform: scale(1.1);
  }
`;

// with a stateless Component, render one button per heading 
const AppButtons = (props) => {
  // console.log(props.headings);
  // loop through the array of headings and include a button element each
  let buttons = props.buttons.map((button, index) => {
    return <Button key={index} id={index} dangerouslySetInnerHTML={{__html: button.icon}} title={button.heading} onClick={props.handleClick}></Button>;
  });
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
