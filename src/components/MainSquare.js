import React, { useState } from "react";
import Square from "./Square";

function MainSquare() {
  const [myArr, setMyArr] = useState({
    squares: Array(9).fill(null),
    isXTurn: true,
  });

  const [winner, setWinner] = useState("");

  const cloneSquares = myArr.squares.slice(0);

  const [history, setHistory] = useState([]);

  const handleClick = (i) => {
    if (!(myArr.squares[i] == null) || winner) {
      return;
    } else if (myArr.squares[i] == null) {
      myArr.isXTurn ? (cloneSquares[i] = "X") : (cloneSquares[i] = "O");

      setMyArr({ squares: cloneSquares, isXTurn: !myArr.isXTurn });
      const winningCondition =
        (cloneSquares[0] &&
          cloneSquares[1] == cloneSquares[2] &&
          cloneSquares[2] == cloneSquares[0]) ||
        (cloneSquares[3] &&
          cloneSquares[4] == cloneSquares[5] &&
          cloneSquares[5] == cloneSquares[3]) ||
        (cloneSquares[6] &&
          cloneSquares[7] == cloneSquares[8] &&
          cloneSquares[8] == cloneSquares[6]) ||
        (cloneSquares[0] &&
          cloneSquares[4] == cloneSquares[8] &&
          cloneSquares[8] == cloneSquares[0]) ||
        (cloneSquares[2] &&
          cloneSquares[4] == cloneSquares[6] &&
          cloneSquares[6] == cloneSquares[2]) ||
        (cloneSquares[1] &&
          cloneSquares[4] == cloneSquares[7] &&
          cloneSquares[7] == cloneSquares[1]) ||
        (cloneSquares[0] &&
          cloneSquares[3] == cloneSquares[6] &&
          cloneSquares[6] == cloneSquares[0]) ||
        (cloneSquares[2] &&
          cloneSquares[5] == cloneSquares[8] &&
          cloneSquares[8] == cloneSquares[2]);
      if (winningCondition) {
        myArr.isXTurn ? setWinner("X") : setWinner("O");
      } else if (!winner && !cloneSquares.includes(null)) {
        setWinner("Friendship");
      }
    }

    setHistory(history.concat([cloneSquares]));
  };

  const handleUndo = () => {
    if (history.length > 1) {
      if (winner) {
        setWinner("");
      }
      setMyArr({
        isXTurn: !myArr.isXTurn,
        squares: history[history.length - 2],
      });

      setHistory(history.slice(0, history.length - 1));
    } else if (history.length == 1) {
      setMyArr({ isXTurn: true, squares: Array(9).fill(null) });
      setHistory([Array(9).fill(null)]);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="main-square">
        <Square handleClick={() => handleClick(0)} value={cloneSquares[0]} />
        <Square handleClick={() => handleClick(1)} value={cloneSquares[1]} />
        <Square handleClick={() => handleClick(2)} value={cloneSquares[2]} />

        <Square handleClick={() => handleClick(3)} value={cloneSquares[3]} />
        <Square handleClick={() => handleClick(4)} value={cloneSquares[4]} />
        <Square handleClick={() => handleClick(5)} value={cloneSquares[5]} />

        <Square handleClick={() => handleClick(6)} value={cloneSquares[6]} />
        <Square handleClick={() => handleClick(7)} value={cloneSquares[7]} />
        <Square handleClick={() => handleClick(8)} value={cloneSquares[8]} />
      </div>

      <div className="info">
        <div className="score-board">
          {winner ? (
            <h2>
              Congratulations! <br />
              <br /> {winner} is winner!!
            </h2>
          ) : myArr.isXTurn ? (
            <h2>Next player: X </h2>
          ) : (
            <h2>Next player: O</h2>
          )}
        </div>

        <div className="undo">
          <button onClick={handleUndo}>Undo</button>
        </div>
      </div>
    </>
  );
}

export default MainSquare;
