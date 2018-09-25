export const convertToArray = (dataModel) => {
  let board = [null, null, null, null, null, null, null, null, null];

  dataModel.usersCells.forEach(c => {
    const cellIndex = (c.col * 3) + c.row;
    board[cellIndex] = 0;
  });

  dataModel.computersCells.forEach(c => {
    const cellIndex = (c.col * 3) + c.row;
    board[cellIndex] = 1;
  });

  return board;
};

export const convertToModel = (board) => {
  let dataModel = {
    usersCells: [],
    computersCells: []
  };
  board.forEach((c, idx) => {
    if (c === null) {
      return;
    }

    const model = {
      col: (idx - (idx % 3)) / 3,
      row: idx % 3
    };
    const playerCellKey = c === 0 ? "usersCells" : "computersCells";
    dataModel[playerCellKey].push(model);
  });

  return dataModel;
}

export const selectAvailableCell = (board) => {
  const availableCells = [];
  board.forEach((c, idx) => {
    if (c !== null) {
      return;
    }
    availableCells.push(idx);
  });

  return availableCells.length > 0 
    ? availableCells[Math.floor(Math.random() * availableCells.length)]
    : null;
}

export const checkForWinner = (board, isPlayersTurn) => {
  const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  const currentTurn = isPlayersTurn ? 0 : 1;
  const winningCombo = winningCombos.find((combo) => {
    if(board[combo[0]] !== null && board[combo[1]] !== null && board[combo[2]] !== null && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
      return isPlayersTurn;
    } else {
      return false;
    }
  });
  return winningCombo ? ({ id: currentTurn, combo: winningCombo}) : undefined;
}