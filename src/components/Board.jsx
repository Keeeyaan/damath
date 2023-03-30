import React, { useState, useEffect } from "react";

import Square from "./Square";
import Piece from "./Piece";
import CaptureModal from "./UI/CaptureModal";
import GameOverModal from "./UI/GameOverModal";

const Board = ({
  rows,
  cols,
  onAddPlayerRedScore,
  onAddPlayerBlueScore,
  playerRedScore,
  playerBlueScore,
  minusRedCountdown,
  minusBlueCountdown,
  setCurrentTurn,
  winnerIsBlue,
  setWinnerIsBlue,
  gameOver,
  setGameOver,
}) => {
  //This will create two dimensional array based on rows and cols
  const [pieces, setPieces] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null))
  );

  //Board Logic
  const [selectedPiece, setSelectedPiece] = useState(null);
  /*This will set what color gonna be first*/
  const [currentPlayerIsBlue, setCurrentPlayerIsBlue] = useState(true);
  const [hasCapturedProgress, setHasCapturedProgress] = useState(false);
  const [queenCaptured, setQueenCaptured] = useState(null);

  //Game Logic
  const [capturedModalToggle, setCapturedModalToggle] = useState(false);
  const [captureValue, setCaptureValue] = useState(null);

  const getCapturedPiece = (srcRow, srcCol, destRow, destCol) => {
    const midRow = (srcRow + destRow) / 2;
    const midCol = (srcCol + destCol) / 2;

    return { row: midRow, col: midCol };
  };

  const getQueenCapturePiece = (srcRow, srcCol, destRow, destCol) => {
    let queenCaptured = {};
    let capturedPieceCount = 0;
    let lastCapturedPieceIsBlue = null;

    // Check if there are any pieces on the diagonal path and if they can be captured
    for (let i = 1; i < steps; i++) {
      const row = srcRow + ((destRow - srcRow) / steps) * i;
      const col = srcCol + ((destCol - srcCol) / steps) * i;
      const piece = pieces[row][col];

      if (piece) {
        if (piece.isBlue === srcPiece.isBlue) {
          return false; // Cannot move over or capture own piece
        } else {
          capturedPieceCount++;
          queenCaptured = { row, col };

          if (
            lastCapturedPieceIsBlue !== null &&
            lastCapturedPieceIsBlue === piece.isBlue
          ) {
            return false; // Cannot capture two pieces of the same color in a row
          }
          lastCapturedPieceIsBlue = piece.isBlue;
        }
      }
    }

    return capturedPieceCount;
  };

  const isValidMove = (srcRow, srcCol, destRow, destCol) => {
    const srcPiece = pieces[srcRow][srcCol];
    const destPiece = pieces[destRow][destCol];

    //This will allow the piece to move diagonally
    const rowDiff = Math.abs(destRow - srcRow);
    const colDiff = Math.abs(destCol - srcCol);

    if (destPiece) return false;

    // if (srcPiece.isQueen) {
    //   const steps = Math.max(rowDiff, colDiff);

    //   let capturedPieceCount = 0;
    //   let lastCapturedPieceIsBlue = null;

    //   if (rowDiff !== colDiff) return false;

    //   // Check if there are any pieces on the diagonal path and if they can be captured
    //   for (let i = 1; i < steps; i++) {
    //     const row = srcRow + ((destRow - srcRow) / steps) * i;
    //     const col = srcCol + ((destCol - srcCol) / steps) * i;
    //     const piece = pieces[row][col];

    //     if (piece) {
    //       if (piece.isBlue === srcPiece.isBlue) {
    //         return false; // Cannot move over or capture own piece
    //       } else {
    //         capturedPieceCount++;
    //         setQueenCaptured({ row, col });

    //         if (
    //           lastCapturedPieceIsBlue !== null &&
    //           lastCapturedPieceIsBlue === piece.isBlue
    //         ) {
    //           return false; // Cannot capture two pieces of the same color in a row
    //         }
    //         lastCapturedPieceIsBlue = piece.isBlue;
    //       }
    //     }
    //   }

    //   return capturedPieceCount <= 1; // The queen can capture a maximum of one piece in a single move
    // }

    //Temporary Queen Piece Move Can move backward
    if (srcPiece.isQueen) {
      if (rowDiff === 1 && colDiff === 1) {
        return true;
      }

      if (rowDiff === 2 && colDiff === 2) {
        const { row: midRow, col: midCol } = getCapturedPiece(
          srcRow,
          srcCol,
          destRow,
          destCol
        );
        const capturedPiece = pieces[midRow][midCol];
        return capturedPiece && capturedPiece.isBlue !== srcPiece.isBlue;
      }

      return false;
    }

    if (
      //This will allow piece to only move forward
      rowDiff === 1 &&
      colDiff === 1 &&
      !srcPiece.isQueen &&
      ((srcPiece.isBlue && destRow < srcRow) ||
        (!srcPiece.isBlue && destRow > srcRow))
    ) {
      return true;
    }

    //This will allow piece to capture opponent piece
    if (rowDiff === 2 && colDiff === 2 && !srcPiece.isQueen) {
      const { row: midRow, col: midCol } = getCapturedPiece(
        srcRow,
        srcCol,
        destRow,
        destCol
      );
      const capturedPiece = pieces[midRow][midCol];
      return capturedPiece && capturedPiece.isBlue !== srcPiece.isBlue;
    }

    return false;
  };

  const checkGameOver = () => {
    const bluePieces = [];
    const redPieces = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const piece = pieces[row][col];
        if (piece) {
          if (piece.isBlue) {
            bluePieces.push({ row, col });
          } else {
            redPieces.push({ row, col });
          }
        }
      }
    }

    const hasValidMove = (piecesArray) => {
      for (const piece of piecesArray) {
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            if (isValidMove(piece.row, piece.col, row, col)) {
              return true;
            }
          }
        }
      }
      return false;
    };

    if (
      (redPieces.length === 0 || !hasValidMove(redPieces)) &&
      playerRedScore > playerBlueScore
    ) {
      setGameOver(true);
      return "Red";
    } else if (
      (bluePieces.length === 0 || !hasValidMove(bluePieces)) &&
      playerBlueScore > playerRedScore
    ) {
      setGameOver(true);
      return "Blue";
    } else if (redPieces.length === 0 || !hasValidMove(redPieces)) {
      setGameOver(true);
      return "Blue";
    } else if (bluePieces.length === 0 || !hasValidMove(bluePieces)) {
      setGameOver(true);
      return "Red";
    }

    return false;
  };

  //Check piece 2 diagonal away if there is any valid capture
  const hasValidCapture = (row, col) => {
    for (let newRow = row - 2; newRow <= row + 4; newRow += 4) {
      for (let newCol = col - 2; newCol <= col + 4; newCol += 4) {
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

  //Check all pieces if there is any valid capture
  const hasAnyValidCapture = () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (
          pieces[row][col] &&
          pieces[row][col].isBlue === currentPlayerIsBlue
        ) {
          if (hasValidCapture(row, col)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const handleClick = (row, col, operator) => {
    if (gameOver) return;

    const clickedPiece = pieces[row][col];
    const anyValidCapture = hasAnyValidCapture();

    //Select the correct piece
    if (
      clickedPiece &&
      clickedPiece.isBlue === currentPlayerIsBlue &&
      (!anyValidCapture || hasValidCapture(row, col))
    ) {
      console.log(clickedPiece);
      return setSelectedPiece({ row, col });
    }

    // This part of the function is executed when a piece is moved
    if (
      selectedPiece &&
      isValidMove(selectedPiece.row, selectedPiece.col, row, col) &&
      (!anyValidCapture ||
        (Math.abs(row - selectedPiece.row) === 2 &&
          Math.abs(col - selectedPiece.col) === 2))
    ) {
      const srcPiece = pieces[selectedPiece.row][selectedPiece.col];

      if (srcPiece.isBlue !== currentPlayerIsBlue) return;

      //Create a shallow copy of the pieces to ensure immutability
      const newPieces = pieces.map((row) => [...row]);

      const rowDiff = Math.abs(row - selectedPiece.row);
      const colDiff = Math.abs(col - selectedPiece.col);

      if (rowDiff === 2 && colDiff === 2) {
        const { row: midRow, col: midCol } = getCapturedPiece(
          selectedPiece.row,
          selectedPiece.col,
          row,
          col
        );

        setCaptureValue({
          captured: newPieces[midRow][midCol].value,
          capturer: srcPiece.value,
          operator: operator,
        });
        setCapturedModalToggle(true);

        newPieces[row][col] = pieces[selectedPiece.row][selectedPiece.col];
        newPieces[selectedPiece.row][selectedPiece.col] = null;
        newPieces[midRow][midCol] = null;

        //Promote piece to queen if it reaches the end of opposite side
        if (
          newPieces[row][col].isQueen === false &&
          ((newPieces[row][col].isBlue && row === 0) ||
            (!newPieces[row][col].isBlue && row === rows - 1))
        ) {
          newPieces[row][col].isQueen = true;
        }

        setPieces(newPieces);

        //Check if there is another piece available to capture
        if (hasAnyValidCapture()) {
          setHasCapturedProgress(true);
          return setSelectedPiece({ row, col });
        }

        setHasCapturedProgress(false);
        setSelectedPiece(null);
        return setCurrentPlayerIsBlue(!currentPlayerIsBlue);
      }

      //Update the board state with the new piece positions
      newPieces[row][col] = pieces[selectedPiece.row][selectedPiece.col];

      newPieces[selectedPiece.row][selectedPiece.col] = null;

      //Promote piece to queen if it reaches the end of opposite side
      if (
        newPieces[row][col].isQueen === false &&
        ((newPieces[row][col].isBlue && row === 0) ||
          (!newPieces[row][col].isBlue && row === rows - 1))
      ) {
        newPieces[row][col].isQueen = true;
      }

      setPieces(newPieces);
      setCurrentPlayerIsBlue(!currentPlayerIsBlue);
    }

    return setSelectedPiece(null);
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

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const key = `${row}-${col}`;
        const piece = pieces[row][col];
        const isOdd = (row + col) % 2 === 1;
        const isEven = (row + col) % 2 === 0;
        const operator =
          isEven && operators[Math.floor((row * cols + col) / 2)];
        squares.push(
          <Square
            key={key}
            isOdd={isOdd}
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
                isBlue={piece.isBlue}
                value={piece.value}
                isQueen={piece.isQueen}
                isSelected={
                  selectedPiece &&
                  selectedPiece.row === row &&
                  selectedPiece.col === col
                }
              />
            )}
          </Square>
        );
      }
    }
    return squares;
  };

  const timerCompleteHandler = () => {
    if (currentPlayerIsBlue) {
      minusRedCountdown();
    } else {
      minusBlueCountdown();
    }

    const winner = checkGameOver();
    if (winner === "Blue") {
      setWinnerIsBlue(true);
    } else {
      setWinnerIsBlue(false);
    }

    setCaptureValue({});
    setCapturedModalToggle(false);
  };

  const answerSubmitHandler = (answer) => {
    const playerAnswer = parseFloat(answer.current.value);
    let correctAnswer =
      captureValue.operator === "x"
        ? parseInt(captureValue.capturer) * parseInt(captureValue.captured)
        : captureValue.operator === "÷"
        ? parseInt(captureValue.capturer) / parseInt(captureValue.captured)
        : captureValue.operator === "-"
        ? parseInt(captureValue.capturer) - parseInt(captureValue.captured)
        : captureValue.operator === "+"
        ? parseInt(captureValue.capturer) + parseInt(captureValue.captured)
        : "";

    //If has decimal places fixed it to 2
    if (correctAnswer - Math.floor(correctAnswer) !== 0) {
      correctAnswer = parseFloat(correctAnswer.toFixed(2));
    }

    console.log(playerAnswer, correctAnswer);

    if (
      !currentPlayerIsBlue &&
      playerAnswer === correctAnswer &&
      hasCapturedProgress
    ) {
      onAddPlayerRedScore();
      setCaptureValue({});
      return setCapturedModalToggle(false);
    } else if (
      currentPlayerIsBlue &&
      playerAnswer === correctAnswer &&
      hasCapturedProgress
    ) {
      onAddPlayerBlueScore();
      setCaptureValue({});
      return setCapturedModalToggle(false);
    } else if (
      !currentPlayerIsBlue &&
      playerAnswer !== correctAnswer &&
      hasCapturedProgress
    ) {
      minusRedCountdown();
      setCaptureValue({});
      return setCapturedModalToggle(false);
    } else if (
      currentPlayerIsBlue &&
      playerAnswer !== correctAnswer &&
      hasCapturedProgress
    ) {
      minusBlueCountdown();
      setCaptureValue({});
      return setCapturedModalToggle(false);
    }

    if (!currentPlayerIsBlue && playerAnswer === correctAnswer) {
      onAddPlayerBlueScore();
    } else if (currentPlayerIsBlue && playerAnswer === correctAnswer) {
      onAddPlayerRedScore();
    } else if (!currentPlayerIsBlue && playerAnswer !== correctAnswer) {
      minusBlueCountdown();
    } else if (currentPlayerIsBlue && playerAnswer !== correctAnswer) {
      minusRedCountdown();
    }

    setCaptureValue({});
    setCapturedModalToggle(false);

    const winner = checkGameOver();
    if (winner === "Blue") {
      setWinnerIsBlue(true);
    } else {
      setWinnerIsBlue(false);
    }
  };

  useEffect(() => {
    setCurrentTurn(currentPlayerIsBlue);
  }, [currentPlayerIsBlue]);

  useEffect(() => {
    //Switch turn if no available piece to capture after capturing a piece
    if (!hasAnyValidCapture() && hasCapturedProgress) {
      setHasCapturedProgress(false);
      setSelectedPiece(null);
      setCurrentPlayerIsBlue(!currentPlayerIsBlue);
    }
  }, [pieces]);

  useEffect(() => {
    const initialPieces = () => {
      const value = [3, 6, 9, 12, 8, 11, 4, 1, 5, 2, 7, 10];
      let valueCounterRed = 0;
      let valueCounterBlue = 11;
      const newPieces = pieces.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if ((rowIndex + colIndex) % 2 === 0) {
            if (rowIndex < 3) {
              return {
                isBlue: false,
                isQueen: false,
                value: value[valueCounterRed++],
              };
            } else if (rowIndex > 4) {
              return {
                isBlue: true,
                isQueen: false,
                value: value[valueCounterBlue--],
              };
            }
          }
        })
      );
      setPieces(newPieces);
    };

    initialPieces();
  }, []);

  return (
    <>
      <div>
        {capturedModalToggle && (
          <CaptureModal
            capturedProgress={hasCapturedProgress}
            currentPlayer={currentPlayerIsBlue}
            onSubmit={answerSubmitHandler}
            onComplete={timerCompleteHandler}
            captureValue={captureValue}
          />
        )}

        {gameOver && <GameOverModal winnerIsBlue={winnerIsBlue} />}

        <div
          className="grid gap-[1px] w-full max-w-[500px] h-full max-h-[500px]"
          style={{
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
          }}
        >
          {renderSquares()}
        </div>
      </div>
    </>
  );
};

export default Board;
