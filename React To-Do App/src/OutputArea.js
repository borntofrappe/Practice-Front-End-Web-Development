import React from 'react';
import './OutputArea.css';


/*
in the stateless component representing the output area: 
- include a wrapping ul elemet which nests all the different list items
*/
const OutputArea = (props) => {
  // store in a variable the array retrieved through props
  let todo = props.todo;
  /* map through the array and add one list item element for each array item
  remember to include
  - a key which is unique for each mapped item (included here with the index of the mapped item)
  - a data-key attribute which is used to identify and then remove the clicked list item
  - the handleClick method inherited with props
  */
  let listItems = todo.map((listItem, index) => <li key={index} data-key={index} onClick={props.handleClick}>{listItem}</li>);
  return (
    <ul className="OutputArea">
      { listItems }
    </ul>
  );
} 
export default OutputArea;
