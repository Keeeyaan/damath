import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import RestartAlt from "@mui/icons-material/RestartAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Square from "./Square";
import Piece from "./Piece";
import CaptureModal from "./UI/CaptureModal";

const Board = ({ rows, cols }) => {
  const [pieces, setPieces] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null))
  );

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  //This will set who's player gonna be first
  const [currentPlayerIsBlack, setCurrentPlayerIsBlack] = useState(false);
  const [hasCaptured, setHasCaptured] = useState(false);
  const [capturedModalToggle, setCapturedModalToggle] = useState(false);

  const initialPieces = () => {
    const value = [3, 6, 9, 12, 8, 11, 4, 1, 5, 2, 7, 10];
    let valueCounterBlack = 0;
    let valueCounterWhite = 11;
    const newPieces = pieces.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        if ((rowIndex + colIndex) % 2 === 0) {
          if (rowIndex < 3) {
            return {
              isBlack: true,
              isQueen: false,
              value: value[valueCounterBlack++],
            };
          } else if (rowIndex > 4) {
            return {
              isBlack: false,
              isQueen: false,
              value: value[valueCounterWhite--],
            };
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

    if (rowDiff === 1 && colDiff === 1) {
      //This will prevent piece to move backward
      if (
        (srcPiece.isBlack === false && destRow < srcRow) ||
        (srcPiece.isBlack && destRow > srcRow)
      ) {
        return true;
      } else {
        return false;
      }
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

  const hasValidCapture = (row, col) => {
    for (let newRow = row - 2; newRow <= row + 2; newRow += 4) {
      for (let newCol = col - 2; newCol <= col + 2; newCol += 4) {
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          isValidMove(row, col, newRow, newCol)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const handleClick = (row, col, operator) => {
    if (gameOver) return;

    console.log(operator);

    const clickedPiece = pieces[row][col];

    if (clickedPiece && clickedPiece.isBlack === currentPlayerIsBlack) {
      console.log(clickedPiece);
      console.log(row, col);
      setSelectedPiece({ row, col });
    } else if (
      selectedPiece &&
      isValidMove(selectedPiece.row, selectedPiece.col, row, col)
    ) {
      const srcPiece = pieces[selectedPiece.row][selectedPiece.col];
      if (srcPiece.isBlack !== currentPlayerIsBlack) return;

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
        setCapturedModalToggle(true);
        newPieces[midRow][midCol] = null;
      }
      setPieces(newPieces);
      setSelectedPiece(null);

      const justCaptured = rowDiff === 2 && colDiff === 2;
      if (justCaptured && hasValidCapture(row, col)) {
        setSelectedPiece({ row, col });
        setHasCaptured(true);
      } else {
        setHasCaptured(false);
        if (!checkGameOver(currentPlayerIsBlack)) {
          setCurrentPlayerIsBlack(!currentPlayerIsBlack);
        }
      }
    } else {
      setSelectedPiece(null);
    }
  };

  const renderSquares = () => {
    const squares = [];
    const operators = [
      "x",
      "÷",
      "-",
      "+",
      "÷",
      "x",
      "+",
      "-",
      "-",
      "+",
      "x",
      "÷",
      "+",
      "-",
      "÷",
      "x",
      "x",
      "÷",
      "-",
      "+",
      "÷",
      "x",
      "+",
      "-",
      "-",
      "+",
      "x",
      "÷",
      "+",
      "-",
      "÷",
      "x",
    ];
    let operatorIndex = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isBlack = (row + col) % 2 === 1;
        const key = `${row}-${col}`;
        const piece = pieces[row][col];
        const operator = (row + col) % 2 === 0 && operators[operatorIndex++];
        squares.push(
          <Square
            key={key}
            isBlack={isBlack}
            onClick={() => handleClick(row, col, operator)}
            operator={operator}
          >
            <div className="h-full w-full flex justify-center items-center">
              <p className=" text-slate-700 font-bold text-xl cursor-default">
                {operator}
              </p>
            </div>
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
      {capturedModalToggle && (
        <CaptureModal setCapturedModalToggle={setCapturedModalToggle} />
      )}
      <div className="grid place-items-center h-screen">
        <div className="">
          <div className="mb-6 flex gap-2 items-center">
            <Link to="/">
              <button className="bg-slate-600 hover:bg-slate-700 text-white font-bold border py-2 px-2 rounded transition ease-in-out">
                <ArrowBackIcon />
              </button>
            </Link>
            <button className=" bg-lime-600 hover:bg-lime-700 text-white font-bold border py-2 px-2 rounded transition ease-in-out ">
              <RestartAlt onClick={() => window.location.reload(false)} />
            </button>
          </div>
          <div
            className="grid gap-[1px] w-full max-w-[500px] h-full max-h-[500px]"
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
        </div>
      </div>
    </>
  );
};

export default Board;
