import React, { Component } from 'react';
import './App.css';
import InputArea from './InputArea';
import OutputArea from './OutputArea';

// through a single stateful component, render two stateless components for the input and output area
// include the input area after the output one to have the input of type="text" be displayed below the div showing the different list items 
class App extends Component {
  constructor(props) {
    super(props);
    // in the state of the component, include an empty array which is used as to include to-do items
    this.state = {
      todo: []
    }
    /*
    bind two methods
    - one which handles the onSubmit event on the form element
    - one which handles the onClick event on the different list items 
    */
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  /*
  through the handleSubmit method, push in the array found in the state the text of the input element 
  as the array is passed to the output area, this will map through the array to display each item in a separate list item 
  */
  handleSubmit(e) {
    // e.target refers to the form element, which nests the input and button elements
    e.preventDefault();
    let form = e.target;
    let input = form.querySelector("input");
    let inputValue = input.value;
    
    // include the todo item if text is actually present in the input
    if(inputValue !== "") {
      let todo = this.state.todo;
      todo.push(inputValue);
      
      this.setState({
        todo: todo
      });
  
      // remove any text that was present in the input element
      input.value = "";
    }
  }

  /*
  through the handleClick method, the list item which is clicked in the output area is removed from the todo array
  */
  handleClick(e) {
    // each list item is given a special data-key attribute which correspond to the index in the array 
    let indexOfClicked = e.target.getAttribute("data-key");
    let todo = this.state.todo;
    // remove the single item which is clicked from the array 
    todo.splice(indexOfClicked,1);
    this.setState({
      todo: todo
    });
  }

  // while rendering the child components, the state and the defined methods are passed as properties
  render() {
    return (
      <div className="App">
        {/* the output area considers the array of to-dos and the handleClick method */}
        <OutputArea todo={this.state.todo} handleClick={this.handleClick} />
        {/* the input area considers the handleSubmit method only */}
        <InputArea handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
