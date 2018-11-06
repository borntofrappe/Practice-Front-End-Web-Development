import React, { Component } from 'react';
import './css/App.css';
import AppOutput from './AppOutput';
import AppInput from './AppInput';


/*
in the main stateful component detail:
AppInput, where the visitor types in a message
AppOutput, where the typed message is eventually displayed
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      update: '',
      updates: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { title, subtitle, update } = this.state;
    if (update) {
      const updates = this.state.updates;
      updates.push({
        title,
        subtitle,
        update
      });

      this.setState({
        title: '',
        subtitle: '',
        update: '',
        updates
      })
    }
  }
  handleInput(e) {
    const input = e.target.value;
    const id = e.target.getAttribute('id');
    this.setState({
      [id]: input
    })
  }
  render() {
    return (
      <div className="App">
        <AppInput handleSubmit={this.handleSubmit} handleInput={this.handleInput} title={this.state.title} subtitle={this.state.subtitle} update={this.state.update} />
        {
          this.state.updates.length > 0 &&
          <AppOutput updates={this.state.updates} />
        }
      </div>
    );
  }
}

export default App;
