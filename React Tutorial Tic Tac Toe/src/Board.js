import React from 'react';
import Square from './Square.js';

// create a function to establish a winner
// accepting as argument an array of 9 values describing the board
function declareWinner(squares) {
	/* create an array of all possible winning combinations
		considering the board

		0 1 2
		3 4 5
		6 7 8
	*/
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

	// loop through the array of winning combinations
  for (let i = 0; i < lines.length; i += 1) {
		// destructure the indexes from the array of winning combinations
    const [a, b, c] = lines[i];
		// if the values in the squares array are the same (and not null) return the winner, else return null
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// in a stateful component manage the state of the application and render the board of the game
class Board extends React.Component {
  constructor(props) {
    super(props);
    // state including an array of 9 values (initially set to null) and a boolean to toggle the X and O mark
		this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

	// function called when clicking on each button on the board
  handleClick(i) {
		// create a copy of the board's values (stored in the state)
    const squares = [...this.state.squares];
    // if the array returns a winner or the selected item has already a value return; preemptively stopping the function
		if (declareWinner(squares) || squares[i]) {
      return;
    }

		// assuming a move can be made, include in the precise position an X or O mark depending on the boolean
    squares[i] = (this.state.xIsNext) ? 'X' : 'O';
		// update the state with the new board and the toggled boolean
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext
    });
  }

	// create a function which returns a Square component, detailing its value and passing through props also the function called onClick
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        handleClick={() => this.handleClick(i)}
      />
    );
  }

	/* render a hierachy as follows:
		- paragraph describing a potential winner/ which side can play
		- one div container for each row
		- in each container three squares, as per the renderSquare function
	*/
  render() {
		// compute the message on the basis of whether the board has already a winner
    const winner = declareWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Victorious player: ${winner}`
    } else {
      status = `Player's turn: ${(this.state.xIsNext) ? 'X' : 'O'}`;
    }
    return (
      <div className="Board">
        <p>{status}</p>
        <div className="Row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>

        <div className="Row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>

        <div className="Row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

      </div>
    );
  }
}

export default Board;