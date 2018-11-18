import React from 'react';
import Board from './Board';

// in a stateful component render a header and the component responsible for the games' baord
class Game extends React.Component {
  render() {
    return (
      <div className="Game">
        <h1>Tic Tac Toe</h1>
        <Board />
      </div>
    );
  }
}


export default Game;