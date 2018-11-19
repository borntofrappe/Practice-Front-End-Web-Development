import React from 'react';
import './css/TimeTravel.css';

// for the time traveling feature add the different moves in a <details> element
// this to highlight them only when requested (by clicking on the summary element)
class TimeTravel extends React.Component {
  render() {
    return (
      <div className="TimeTravel">
        <details>
          <ul>
            {this.props.moves}
          </ul>
          <summary>TIme Travel</summary>
        </details>
      </div>
    );
  }
}


export default TimeTravel;