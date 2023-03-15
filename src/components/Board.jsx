import React, { useState, useEffect } from "react";

import Square from "./Square";
import Piece from "./Piece";

const Board = ({ rows, cols }) => {
  const [pieces, setPieces] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null))
  );

  console.log(pieces);
  const initialPieces = () => {
    const newPieces = pieces.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        if (rowIndex < 3 && (rowIndex + colIndex) % 2 === 0) {
          return { isBlack: true };
        }
        if (rowIndex > 4 && (rowIndex + colIndex) % 2 === 0) {
          return { isBlack: false };
        }
        return null;
      })
    );
    setPieces(newPieces);
  };

  const renderSquares = () => {
    const squares = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        console.log(row, col);
        const isBlack = (row + col) % 2 === 1;
        const key = `${row}-${col}`;
        console.log(isBlack);
        const piece = pieces[row][col];

        squares.push(
          <Square key={key} isBlack={isBlack}>
            {piece && <Piece isBlack={piece.isBlack} />}
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
    <div
      className="grid gap-[1px] w-full max-w-[500px] h-full max-h-[500px] my-0 mx-auto]"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {renderSquares()}
    </div>
  );
};

export default Board;
