import React from 'react';
import './InputArea.css';

/*
in the stateless component representing the input area: 
- include a wrapping form elemet which considers the handleSubmit method defined in the parent component
  - include an input 
  - include a button
As the functionality of the input area is fulfilled solely through the form and its onSubmit property, the input and butto elements are included rather barebone
*/
const InputArea = (props) => {
  return (
    <form className="InputArea" onSubmit={props.handleSubmit}>
      <input type="text" placeholder="Pin task"/>
      <button>
        <svg width="100" height="100" viewBox="0 0 26.458 26.458" xmlns="http://www.w3.org/2000/svg"><path d="M16.359.006a7.757 7.643 0 0 0-6.661 3.259 7.757 7.643 0 0 0 .578 9.462l-7.51 12.751c-.235.4-.053.98-.053.98s.616-.03.916-.385l9.57-11.334a7.757 7.643 0 0 0 9.215-2.718A7.757 7.643 0 0 0 20.5 1.38a7.757 7.643 0 0 0-4.14-1.373z"/></svg>
      </button>
    </form>
  );
} 
export default InputArea;
