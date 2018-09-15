import React from 'react';

// import styled components to style the button element
import styled from 'styled-components';
import { keyframes } from 'styled-components';

// include a keyframe animation
const connect = keyframes`
  100% {
    stroke-dasharray: 4px 20px;
    stroke-dashoffset: var(--stroke-dash);
  }
`;

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
