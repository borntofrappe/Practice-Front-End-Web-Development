import React from 'react';
import SVGIcon from './SVGIcon';

// render in a fragment the SVG theme icon according to the boolean isDark variable
// ! remember viewbox is **viewBox** in react land
// likewise, stroke-width is strokeWidth and stroke-dasharray becomes strokeDasharray
const SVGTheme = (props) => {
  return (
    <React.Fragment>
      {
        props.isDark &&
        <SVGIcon id="sun-icon" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <g transform="translate(10,10)">
            <circle cx="40" cy="40" r="30" fill="#fff" />
            <circle cx="40" cy="40" r="35" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="10" />
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
    </React.Fragment>

  );
}

export default SVGTheme;
