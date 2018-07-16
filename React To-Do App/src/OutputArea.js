import React from 'react';
import './OutputArea.css';



const OutputArea = (props) => {
  let todo = props.todo;
  let listItems = todo.map((listItem, index) => <li key={index} data-key={index} onClick={props.handleClick}>{listItem}</li>);
  return (
    <ul className="OutputArea">
      { listItems }
    </ul>
  );
} 
export default OutputArea;
