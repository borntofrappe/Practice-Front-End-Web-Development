import React from 'react';
import Board from './Board';
import TimeTravel from './TimeTravel';
import './Game.css';

// in a stateful component render a header and the component responsible for the games' baord
class Game extends React.Component {
  render() {
    return (
      <div className="Game">
        <h1>Tic Tac Toe</h1>
        <Board />
        <TimeTravel />
      </div>
    );
  }
}


export default Game;