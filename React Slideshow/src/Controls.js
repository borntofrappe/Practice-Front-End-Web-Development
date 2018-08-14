import React from 'react';
import './css/Controls.css';

// for the controls component, render the two buttons to move to the previous / following slide
const Controls = (props) => {

  return(
    <div className="Controls">
      <button onClick={props.prevSlide} />
      <button onClick={props.nextSlide} />
    </div>
  );

}

export default Controls;
