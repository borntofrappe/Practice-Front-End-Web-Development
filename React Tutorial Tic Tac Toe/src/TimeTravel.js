import React from 'react';
import './css/TimeTravel.css';

// for the time traveling feature add the different moves in a <details> element
// this to highlight the buttons only when requested (by clicking on the summary element)
// destructure moves from the props argument
const TimeTravel = ({ moves }) => {
  return (
    <div className="TimeTravel">
      <details>
        <ul>
          {moves}
        </ul>
        <summary>Time Travel</summary>
      </details>
    </div>
  );
};

export default TimeTravel;