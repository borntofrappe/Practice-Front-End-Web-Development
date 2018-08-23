import React from 'react';
import './css/AppVisual.css';
// import the components 

// with a stateless Component, information stored in the array of objects
const AppVisual = (props) => {
  let data = props.data[props.section];
  console.log(data);
  return(
    <div className="AppVisual">
      <div className="VisualText">
        {
          data.heading &&
          <h2>{data.heading}</h2>
        }
        {
          data.brief &&
          <p>{data.brief}</p>
        }
      </div>
      {
        data.snippet &&
        <pre className="VisualCode">
          <code>
            {data.snippet}
          </code>
        </pre>
      }

    </div>
  );
}

export default AppVisual;
