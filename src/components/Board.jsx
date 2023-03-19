import React, { useState, useEffect } from "react";

import Square from "./Square";
import Piece from "./Piece";

const Board = ({ rows, cols }) => {
  const [pieces, setPieces] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null))
  );

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const initialPieces = () => {
    const newPieces = pieces.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        if ((rowIndex + colIndex) % 2 === 0) {
          if (rowIndex < 3) {
            return { isBlack: true, isQueen: false };
          } else if (rowIndex > 4) {
            return { isBlack: false, isQueen: false };
          }
        }
      })
    );
    setPieces(newPieces);
  };

  const getCapturedPiece = (srcRow, srcCol, destRow, destCol) => {
    const midRow = (srcRow + destRow) / 2;
    const midCol = (srcCol + destCol) / 2;
    return { row: midRow, col: midCol };
  };

  const isValidMove = (srcRow, srcCol, destRow, destCol) => {
    const srcPiece = pieces[srcRow][srcCol];
    const destPiece = pieces[destRow][destCol];

    //This will allow the piece to move diagonally
    const rowDiff = Math.abs(destRow - srcRow);
    const colDiff = Math.abs(destCol - srcCol);

    if (destPiece) return false;

    console.log(srcPiece);
    console.log(destPiece);

    if (rowDiff === 1 && colDiff === 1) {
      // //This will prevent piece to move backward
      if (srcPiece.isBlack && destRow < srcRow) {
        console.log("invalid moveb");
        return false;
      } else if (!srcPiece.isBlack && destRow > srcRow) {
        console.log("invalid movea");
        return false;
      }

      return true;
    } else if (rowDiff === 2 && colDiff === 2) {
      const { row: midRow, col: midCol } = getCapturedPiece(
        srcRow,
        srcCol,
        destRow,
        destCol
      );
      const capturedPiece = pieces[midRow][midCol];

      return capturedPiece && capturedPiece.isBlack !== srcPiece.isBlack;
    }

    return false;
  };

  const checkGameOver = (currentPlayerIsBlack) => {
    let opponentPieces = 0;
    let opponentHasValidMoves = false;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const piece = pieces[row][col];
        if (piece && piece.isBlack !== currentPlayerIsBlack) {
          opponentPieces++;

          for (let newRow = row - 2; newRow <= row + 2; newRow++) {
            for (let newCol = col - 2; newCol <= col + 2; newCol++) {
              if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                isValidMove(row, col, newRow, newCol, true)
              ) {
                opponentHasValidMoves = true;
              }
            }
          }
        }

        if (opponentPieces > 0 && opponentHasValidMoves) {
          return false;
        }
      }
    }

    setGameOver(true);
    setWinner(currentPlayerIsBlack ? "Black" : "White");
    return true;
  };

  const handleClick = (row, col) => {
    if (gameOver) return;
    if (pieces[row][col] && !selectedPiece) {
      setSelectedPiece({ row, col });
    } else if (
      selectedPiece &&
      isValidMove(selectedPiece.row, selectedPiece.col, row, col)
    ) {
      //Create a shallow copy of the pieces to ensure immutability
      const newPieces = pieces.map((row) => [...row]);

      //Set the value of destination square from selected square
      newPieces[row][col] = pieces[selectedPiece.row][selectedPiece.col];

      //Set the value of selected square to null
      newPieces[selectedPiece.row][selectedPiece.col] = null;

      const rowDiff = Math.abs(row - selectedPiece.row);
      const colDiff = Math.abs(col - selectedPiece.col);
      if (rowDiff === 2 && colDiff === 2) {
        const { row: midRow, col: midCol } = getCapturedPiece(
          selectedPiece.row,
          selectedPiece.col,
          row,
          col
        );
        newPieces[midRow][midCol] = null;
      }

      setPieces(newPieces);
      setSelectedPiece(null);

      checkGameOver(newPieces[row][col].isBlack);
    } else {
      setSelectedPiece(null);
    }
  };

  const renderSquares = () => {
    const squares = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isBlack = (row + col) % 2 === 1;
        const key = `${row}-${col}`;
        const piece = pieces[row][col];
        squares.push(
          <Square
            key={key}
            isBlack={isBlack}
            onClick={() => handleClick(row, col)}
          >
            {piece && (
              <Piece
                isBlack={piece.isBlack}
                value={piece.value}
                isQueen={piece.isQueen}
              />
            )}
          </Square>
        );
      }
    }
    return squares;
  };

  useEffect(() => {
    initialPieces();
  }, []);

  return (
    <>
      <div
        className="grid gap-[1px] w-full max-w-[500px] h-full max-h-[500px] my-0 mx-auto]"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {renderSquares()}
      </div>

      {gameOver && (
        <div className="text-center mt-4">
          <h2>Game Over!</h2>
          <h3>{winner} player wins!</h3>
        </div>
      )}
    </>
  );
};

export default Board;
