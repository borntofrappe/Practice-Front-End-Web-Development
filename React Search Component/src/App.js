import React, { Component } from 'react';
import './css/App.css';
import AppHeader from './AppHeader';
import AppInput from './AppInput';
import AppOutput from './AppOutput';
// import the data stored in ./data/storm.js
import { storms } from './data/storms';

/* in the stateful component 
- include in the state the value for the input element and the one for the output component
- bind the method used to update the input element and the matching state
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: ''
    };
    this.handleInput = this.handleInput.bind(this);
  }

  // function to handle the input element
  handleInput(e) {
    // retrieve the value from the input element
    const input = e.target.value;

    // create a regex to target those object which name starts with the retrieved value
    const regex = new RegExp(`^${input.toLowerCase()}`);
    // create an array of object whose name matches the regular expression
    const output = (input !== "") ? storms.filter(storm => regex.test(storm.name.toLowerCase())) : "";

    // update the input state to contain the new value
    // update the output state to contain the updated array
    this.setState({
      input,
      output
    });
  }
  
  /*
  render:
  - a header component to introduce the project
  - an input component detailing a label and controlled input element 
  - an output component describing one set of elements for each item in the output array
  */
  render() {
    return (
      <div className="App">
        <AppHeader/>
        {/* the input component requires the value of the input element and the function updating it */}
        <AppInput input={this.state.input} handleInput={this.handleInput}/>
        {/* include the output component only if the output variable contains at least one item */}
        {
          (this.state.output.length > 0) && <AppOutput output={this.state.output} />
        }
      </div>
    );
  }
}

export default App;
