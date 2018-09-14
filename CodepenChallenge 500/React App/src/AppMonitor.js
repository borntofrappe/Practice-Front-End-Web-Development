import React from 'react';
import './css/AppMonitor.css';

// render the
const AppMonitor = (props) => {
    let { heading, description } = props.data;

    return(
        <div className="AppMonitor">
            <h2>{heading}</h2>
            <p>{description}</p>
        </div>
    );
}

export default AppMonitor;
