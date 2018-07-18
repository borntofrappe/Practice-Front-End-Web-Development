import React from 'react';
import './OutputArea.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


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
  let listItems = todo.map((listItem, index) => 
  (
  /* wrap each list item in a CSSTransition component
  this allows to include the animation specified in CSS under the class(es) bearing the same value found under classNames
  ! the entire collection of list elements needs to be wrapped in a TransitionGroup component
  */
  <CSSTransition key={index} classNames="fade" timeout={200}>
    <li key={index} data-key={index} onClick={props.handleClick}>{listItem}</li>
  </CSSTransition>
  ));
  return (
    <ul className="OutputArea">
      {/* wrap all list items in a TransitionGroup Component, which is used to include animation (in conjunction with CSSTransitionGroup)
			in the DOM this will be rendered as a wrapping div*/}
			<TransitionGroup>
        { listItems }
      </TransitionGroup>
    </ul>
  );
} 
export default OutputArea;
