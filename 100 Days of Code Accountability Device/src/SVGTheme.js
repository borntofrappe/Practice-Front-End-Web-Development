import React from 'react';
// import './css/SVGTheme.css';
import styled from 'styled-components';

const SVGIcon = styled.svg`
  width: 100%;
  height: 100%;
`;

// in the stateful component manage the state, for the theme behind the app and the buttons displayed in the supporting section
// ! remember viewbox is **viewBox** in react land
const SVGTheme = (props) => {
  return(
    <>
      {
        props.isDark &&  
        <SVGIcon id="sun-icon" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <g transform="translate(10,10)">
          <circle cx="40" cy="40" r="30" fill="#fff" />
          <circle cx="40" cy="40" r="35" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="10" />
        </g>
      </SVGIcon>
      }
      {
        !props.isDark && 
        <SVGIcon id="moon-icon" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <g transform="translate(10,10)">
            <path d="M 50 10 A 20 20 0 0 0 50 70 A 60 60 0 0 1 50 10" fill="#fff" />
          </g>
        </SVGIcon>  
      }
    </>

  );
}

export default SVGTheme;
