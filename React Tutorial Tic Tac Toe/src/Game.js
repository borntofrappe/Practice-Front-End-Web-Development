import React from 'react';
import Board from './Board';
import TimeTravel from './TimeTravel';
import './css/Game.css';

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

// in the main React component class manage the state of the pplication
class Game extends React.Component {
  constructor(props) {
    super(props);
    // STATE
    // history contains an array of objects, each with a singe property: _squares_
    // squares is always an array of 9 items, making up the tic-tac-toe grid
    // xnext is a boolean usedd to toggle between x and o
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xNext: true
    }
  }

  // create a function used when cligking clicking one of the squares in the grid
  handleClick(i) {
    // retrieve the array of objects from the state
    const history = this.state.history;
    // retrieve the last object
    const current = history[history.length - 1];
    // create a copy of the array contained in the last object
    const squares = [...current.squares];
    // pre-emptively quit the function if a winner can already be declared or the button already matches a non null value
    if (declareWinner(squares) || squares[i]) {
      return;
    }
    // alter the value of the respective button including an X or O value
    squares[i] = (this.state.xIsNext) ? 'X' : 'O';
    // update the state adding the new array to the history property
    // toggle xNext to toggle between the two letters
    this.setState({
      history: [...history, { squares }],
      xNext: !this.state.xIsNext
    });
  }


  // in the render function assess a possible victory as to render an appropriate message
  /* then return the following hierarchy
  <h1>Tic Tac Toe</h1>
  <p>Message describing who's turn is it/the winner</p>
  <>Component responsible for the board</>
  <>Component respnsible for the (SOON TO BE ADDED) time traveling feature</>
  */
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = declareWinner(current.squares);

    let status;
    if (winner) {
      status = `Winning side: ${winner}. Congrats!`
    } else {
      status = `Player's turn: ${(this.state.xNext) ? 'X' : 'O'}`;
    }

    return (
      <div className="Game">
        <h1>Tic Tac Toe</h1>
        <p>{status}</p>
        {/* in the board pass the method to update the state as well as the last array of values */}
        <Board handleClick={(i) => this.handleClick(i)} squares={current.squares} />
        <TimeTravel />
      </div>
    );
  }
}


export default Game;