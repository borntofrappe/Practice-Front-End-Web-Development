import React from 'react';
import Square from './Square.js';
import './css/Board.css';

// in a stateful component render the board with nine different elements, positioned in a grid
class Board extends React.Component {

  // instead of using the following render function, create nine squares by mapping through the received array
  /*
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        handleClick={() => this.props.handleClick(i)}
      />
    );
  }
  */

  render() {
    // map through the array and create nine squares with the specified value and onClick method
    const squares = this.props.squares.map((square, index) => {
      return (
        <Square
          value={square}
          key={index}
          handleClick={() => this.props.handleClick(index)}
        />
      );
    })
    // render a container in which the nine squares are wrapped
    return (
      <div className="Board">
        {squares}
      </div>
    );
  }
}

export default Board;