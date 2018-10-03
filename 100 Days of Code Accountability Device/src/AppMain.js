import React from 'react';
// import './css/AppMain.css';
import SVGShare from './SVGShare';

// in the stateful component manage the state, for the theme behind the app and the buttons displayed in the supporting section
const AppMain = (props) => {
  return(
    <main>
      <h1>Something to share?</h1>

      <textarea onChange={props.handleChange} type="text" placeholder="Practiced with React while creating something useful... at least for meta #100daysofcode #R3D13 #react #js" value={props.value}></textarea>

      <button onClick={props.handleShare}>
        <SVGShare />
      </button>
    </main>

  );
}

export default AppMain;
