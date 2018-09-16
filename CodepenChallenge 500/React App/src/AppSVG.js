import React from 'react';

// import styled components to style the button element
import styled from 'styled-components';
// import keyframes to create animations with the same library
import { keyframes } from 'styled-components';

// include a keyframe animation for the svg line, to move said line from completely hidden to a series of dashes
const connect = keyframes`
  100% {
    stroke-dasharray: 4px 20px;
    stroke-dashoffset: var(--stroke-dash);
  }
`;

// hide the svg element by default by including stroke-dasharray and stroke-dashoffset properties to a value which matches the length of the SVG
// the custom property is updated as the components are mounted to exactly consider the length of the svg line
// ! include the animation only through a class, applied as the button gets pressed
const SVG = styled.svg`
  height: 5rem;
  stroke-dasharray: var(--stroke-dash);
  stroke-dashoffset: var(--stroke-dash);

  &.animated {
    animation: ${connect} 4s ease-in forwards;
  }

`;


// render the SVG, as styled through styled components
const AppSVG = () => {
    return(
        <SVG className="AppSVG" viewBox="0 0 10 100">
            <line x1="0" x2="0" y1="0" y2="100" stroke="#fff" strokeWidth="8px"/>
        </SVG>
    );
}

export default AppSVG;
