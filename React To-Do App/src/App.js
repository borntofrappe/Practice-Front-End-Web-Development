import React, { Component } from 'react';
import './App.css';
import InputArea from './InputArea';
import OutputArea from './OutputArea';

// in a single stateful component, include two stateless components fr the input and output area
// include the input area after the output one to have the input of type="text" be displayed below the div showing the different list items 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleInput(e) {
    e.preventDefault();
    let form = e.target;
    let input = form.querySelector("input");

    let todo = this.state.todo;
    todo.push(input.value);

    this.setState({
      todo: todo
    });

    input.value = "";
  }
  handleClick(e) {
    let indexOfClicked = e.target.getAttribute("data-key");
    let todo = this.state.todo;
    todo.splice(indexOfClicked,1);
    this.setState({
      todo: todo
    });
  }
  render() {
    return (
      <div className="App">
        <OutputArea todo={this.state.todo} handleClick={this.handleClick} />
        <InputArea handleInput={this.handleInput} />
      </div>
    );
  }
}

export default App;
