import React from 'react';
// import './css/AppSupport.css';

// in the stateful component manage the state, for the theme behind the app and the buttons displayed in the supporting section
const AppSupport = (props) => {
  return(
    <section>
      {
        props.hashtags.map((hashtag, index) => {
          return <button key={index}>{hashtag}</button>
        })
      }
    </section>

  );
}

export default AppSupport;
