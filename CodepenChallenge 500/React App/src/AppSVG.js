import React from 'react';
import './css/AppSVG.css';

// render the SVG, as styled through styled components
const AppSVG = () => {
    return(
        <svg className="AppSVG" viewBox="0 0 10 100">
            <line x1="0" x2="0" y1="0" y2="100" stroke="#555" strokeWidth="8px"/>
        </svg>
    );
}

export default AppSVG;
