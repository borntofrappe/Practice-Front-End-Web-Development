import React from 'react';
import Square from './Square.js';
import './css/Board.css';

// in a stateful component render the board with nine different elements, positioned in a grid
class Board extends React.Component {

  // create a render function which details a Square component (made up to be a button)
  // pass to this component the value retrieved from the array of values
  // pass als the function to update the state, both for the respective index value
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        handleClick={() => this.props.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="Board">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    );
  }
}

export default Board;