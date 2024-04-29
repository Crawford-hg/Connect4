
import { useState } from 'react';

let turn = 'X';
let winningSquares = [];
let win = false;
// Imports for tic tac toe

function Square({ value, onSquareClick, isWinningSquare }) {
  let className = isWinningSquare ? "WinningSquare" : "Square";
  return <button data-testid={className} className={className} onClick={onSquareClick}>{value}</button>;

}


export default function Board() {
  const [squares, setSquares] = useState(Array(49).fill(null));


  function handleClick(i) {
    if (win) return;
    let col = i % 7;
    let currentFree = 0;
    for (let x = 6; x >= 0; x--) {
      if (!squares[col + x * 7]) {
        currentFree = col + x * 7;
        col += 7;
      }
    }


    if (currentFree !== null) {
      const nextSquares = squares.slice();
      nextSquares[currentFree] = turn;
      setSquares(nextSquares);
      win = doWinChecks(nextSquares, currentFree)
    }
    if (!win) {
      if (turn === 'X')
        turn = 'O';
      else turn = 'X';
    }




  }
  function clearBoard() {
    setSquares([]);
    winningSquares = [];
    turn = 'X';
    win = false;
  }

  let board = [];
  for (let x = 0; x < 7; x++) {
    let row = [];
    for (let i = 0; i < 7; i++) {
      row.push(<Square value={squares[(7 * x + i)]} onSquareClick={() => handleClick((7 * x + i))} isWinningSquare={winningSquares.includes((7 * x + i))
      } />)
    }
    board.push(<div className="board-row">{row}</div>)

  }
  if (win) {
    board.push(<h1>Winner is {turn}</h1>)
    board.push(<button onClick={clearBoard}>NewGame</button>)
  }

  return (
    <>
      <div role="Board">{board}</div>
    </>
  );
}


function doWinChecks(squares, position) {
  let LRDistance = (Math.round((position / 7) % 1 * 7));
  let LRPosition = position - LRDistance;
  return (topDownWinCheck(position, 0, squares) ||
    leftToRightCheck(LRPosition, 0, squares)
    || rightStarting(position, squares)
    || leftStarting(position, squares)
  );
}

function rightStarting(position, squares) {
  while (position % 7 != 0) {
    position += 6;
    if (position > 48) break;
  }
  return rightDownCheck(position, 0, squares);
}

function leftStarting(position, squares) {
  while (position % 7 != 0) {
    if (position + 8 > 48) break;

    position += 8;
  }
  return leftDownCheck(position, 0, squares);
}


function rightDownCheck(position, count, squares) {

  if (position < 0 || position > 48) {
    winningSquares = [];
    return false;

  }
  if (squares[position] && squares[position] === turn) {
    count++;
    winningSquares.push(position)
  }
  else {
    winningSquares = [];
    count = 0
  }
  if (count === 4) return true;
  return rightDownCheck(position - 6, count, squares);


}

function leftDownCheck(position, count, squares) {
  if (position < 0 || position > 48) {
    winningSquares = [];
    return false;
  }
  if (squares[position] && squares[position] === turn) {
    count++;
    winningSquares.push(position)
  }
  else {
    winningSquares = [];
    count = 0
  }
  if (count === 4) return true;

  return leftDownCheck(position - 8, count, squares);


}

function topDownWinCheck(position, count, squares) {
  if (position > (position % 7) + 42) {
    winningSquares = [];
    return false;
  }
  if (squares[position] && squares[position] === turn) {
    count++;
    winningSquares.push(position)
  }
  else {
    winningSquares = [];
    count = 0
  }
  if (count === 4) return true;
  return topDownWinCheck(position + 7, count, squares);
}

function leftToRightCheck(position, count, squares) {

  if (position > 48) {
    winningSquares = [];
    return false;
  }
  if (squares[position] && squares[position] === turn) {
    count++;
    winningSquares.push(position)
  }
  else {
    winningSquares = [];
    count = 0
  }


  if (count === 4) return true;
  if ((position + 1) > position + (Math.round((position / 7) % 1 * 7)) + 6) {
    return false;
  }
  position++;
  return leftToRightCheck((position), count, squares);
}
