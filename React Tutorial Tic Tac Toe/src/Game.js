import React from 'react';
import Board from './Board';
import TimeTravel from './TimeTravel';

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
    // xNext is a boolean usedd to toggle between x and o
    // index is an integer used to keep track of the current turn (and to allow time-traveling between turns)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xNext: true,
      index: 0
    }
  }

  // create a function used when cligking clicking one of the squares in the grid
  handleClick(i) {
    // retrieve the array of objects from the state, up to the object detailed by the index
    const history = this.state.history.slice(0, this.state.index + 1);
    // retrieve the last object
    const current = history[this.state.index];
    // create a copy of the array contained in the last object
    const squares = [...current.squares];
    // pre-emptively quit the function if a winner can already be declared or the button already matches a non null value
    if (declareWinner(squares) || squares[i]) {
      return;
    }
    // alter the value of the respective button including an X or O value
    squares[i] = (this.state.xNext) ? 'X' : 'O';
    // update the state adding the new array to the history property
    // toggle xNext to toggle between the two letters
    // update the index with the length of the now incremented history
    this.setState({
      history: [...history, { squares }],
      xNext: !this.state.xNext,
      index: history.length
    });
  }

  // create a function to jump to a specific turn
  jumpTo(index) {
    // update the state for the index and for the xNext boolean
    // if index is even (0, 2, 4...) it means xNext ought to be true (as it is the first, third, fifth... action)
    // simply updating this state is enough to trigger a re-render of the components using these values, including the board
    this.setState({
      index,
      xNext: (index % 2) === 0
    })
  }

  render() {
    // retrieve the history array and the last item
    const history = this.state.history;
    const current = history[this.state.index];

    // describe a message based on whether the current array of squares has a winner
    // detail also a circumstance in which all squares have been played and no winner is present
    const winner = declareWinner(current.squares);
    let status;
    if (winner) {
      status = `Winning side: ${winner}!`
    } else {
      status = `Player's turn: ${(this.state.xNext) ? 'X' : 'O'}`;
    }
    if (this.state.index === 9 && !winner) {
      status = 'It\'s a draw';
    }

    // for the time traveling feature
    // create multiple list items nesting button elements with the jumpTo function
    const moves = history.map((squares, index) => {
      // for each button include a description based on the index (0 returns false)
      // detail the jumpTo function with the appropriate index
      const description = index ? `Go to move #${index}` : `Go to game start`;
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{description}</button>
        </li>
      );
    });

    /* return the following hieararchy
      <Header/>
      <Status/>
      <BoardComponent/>
      <TimeTravelComponent/>
    */
    return (
      <div className="Game">
        <h1>Tic Tac Toe</h1>
        <p>{status}</p>
        {/* in the board pass the method to update the state as well as the last array of values */}
        <Board
          handleClick={(i) => this.handleClick(i)}
          squares={current.squares}
        />
        {/* in the time travel component pass the series of list items */}
        <TimeTravel moves={moves} />
      </div>
    );
  }
}


export default Game;