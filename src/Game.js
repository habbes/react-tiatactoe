import React from 'react';
import Board from './Board';
import {calculateWinner} from './game-logic';

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  getNextPlayer () {
    return this.state.xIsNext? 'X' : 'O';
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2)? false: true
    });
  }

  handleClick (i) {
    const step = this.state.stepNumber;
    // forget all steps that were already played after this
    // basically altering the fate of the future through time travel
    const history = this.state.history.slice(0, step + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      // don't fill square if game won or square already filled
      return;
    }
    squares[i] = this.getNextPlayer();
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    }
    else {
      status = `Next Player: ${this.getNextPlayer()}`
    }

    const moves = history.map((move, step) => {
      const description = step?
        `Move #${step}`:
        "Game Start";
      return (
        <li key={step}>
          <a href="#" 
            onClick={() => this.jumpTo(step)}>{description}</a>
        </li>
      );
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} 
            onClick={(i) => this.handleClick(i) }/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;