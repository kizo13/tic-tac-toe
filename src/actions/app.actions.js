import axios from 'axios';

import { history } from '../store/store';
import { convertToArray, convertToModel, selectAvailableCell, checkForWinner } from '../helpers/boardHelper';
import { FormTypeKeys } from './form.actions';

const API_URL = 'http://localhost:3000/api/boards';
const ERROR_MESSAGES = {
  DEFAULT: 'Oops! Something went wrong!',
  NAME_ALREADY_EXISTS: 'Yikes! Name already exists!'
};

export const AppTypeKeys = {
  FETCH_BOARDS: 'FETCH_BOARDS',
  FETCH_BOARDS_ISLOADING: 'FETCH_BOARDS_ISLOADING',
  FETCH_BOARD: 'FETCH_BOARD',
  FETCH_BOARD_ISLOADING: 'FETCH_BOARD_ISLOADING',
  DELETE_BOARD: 'DELETE_BOARD',
  CLEAR_BOARD: 'CLEAR_BOARD',
  
  CLEAR_DATA: 'CLEAR_DATA',
  SELECT_CELL: 'SELECT_CELL',
  CHANGE_PLAYERS_TURN: 'CHANGE_PLAYERS_TURN',
  SET_WINNER: 'SET_WINNER',
  SHOW_MODAL: 'SHOW_MODAL',
  SHOW_ERROR: 'SHOW_ERROR',
  SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE',
  SET_BOARD_VALIDITY: 'SET_BOARD_VALIDITY',
}

const actions = {

  getBoards: (nameSegment) => {
    return (dispatch) => {
      dispatch({ type: AppTypeKeys.FETCH_BOARDS_ISLOADING, payload: true });
      const fetchUrl = nameSegment
        ? `${API_URL}?boardNameFragment=${nameSegment}`
        : API_URL;
      axios.get(fetchUrl)
        .then(items => dispatch({ type: AppTypeKeys.FETCH_BOARDS, payload: items.data }))
        .catch((err) => {
          console.info(err);
          dispatch(actions.setErrorMessage(ERROR_MESSAGES.DEFAULT));
          dispatch(actions.showError());
          dispatch({ type: AppTypeKeys.FETCH_BOARDS, payload: null });
        })
        .then(() => dispatch({ type: AppTypeKeys.FETCH_BOARDS_ISLOADING, payload: false }));
    };
  },

  getBoardById: (id) => {
    return (dispatch, getState) => {
      dispatch({ type: AppTypeKeys.FETCH_BOARD_ISLOADING, payload: true });
      axios.get(`${API_URL}/${id}`)
        .then((item) => {
          const data = {
            id: item.data.id,
            boardSize: item.data.boardSize,
            boardName: item.data.boardName,
            cells: convertToArray(item.data)
          };

          const change = Object.assign({}, getState().form.board, { name: item.data.boardName });
          dispatch({
            type: FormTypeKeys.CHANGE_FORM,
            payload: {
              form: 'board',
              fields: Object.assign({}, change),
            },
          });

          dispatch({ type: AppTypeKeys.FETCH_BOARD, payload: data });
          history.push('/board');
        })
        .catch((err) => {
          console.info(err);
          dispatch(actions.setErrorMessage(ERROR_MESSAGES.DEFAULT));
          dispatch(actions.showError());
          dispatch({ type: AppTypeKeys.FETCH_BOARD, payload: null });
        })
        .then(() => dispatch({ type: AppTypeKeys.FETCH_BOARD_ISLOADING, payload: false }));
    };
  },

  deleteBoardById: (id) => {
    return (dispatch) => {
      axios.delete(`${API_URL}/${id}`)
        .then(() => {
          dispatch({ type: AppTypeKeys.DELETE_BOARD, payload: id });
        })
        .catch((err) => {
          console.info(err);
          dispatch(actions.setErrorMessage(ERROR_MESSAGES.DEFAULT));
          dispatch(actions.showError());
        });
    };
  },

  saveBoard: (name, cells) => {
    return (dispatch) => {
      const isNameValid = /^[^\s]{1,50}$/.test(name);
      if (!isNameValid) {
        dispatch({ type: AppTypeKeys.SET_BOARD_VALIDITY, payload: false });
        return;
      }
      
      dispatch({ type: AppTypeKeys.SET_BOARD_VALIDITY, payload: true });
      
      let boardModel = {
        boardSize: 3,
        boardName: name
      }
      let dataModel = convertToModel(cells);
      Object.assign(boardModel, dataModel);
      axios.post(API_URL, boardModel)
        .then((response) => {
          const data = {
            id: response.data.id,
            boardSize: response.data.boardSize,
            boardName: response.data.boardName,
            cells: convertToArray(response.data)
          }
          dispatch({ type: AppTypeKeys.FETCH_BOARD, payload: data });
          dispatch({ type: AppTypeKeys.SHOW_MODAL, payload: false });
        })
        .catch((err) => {
          console.info(err);
          const message = err.response.status === 409 ? ERROR_MESSAGES.NAME_ALREADY_EXISTS : ERROR_MESSAGES.DEFAULT;
          dispatch(actions.setErrorMessage(message));
          dispatch(actions.showError());
        });
    };
  },

  updateBoard: (id) => {
    return (dispatch, getState) => {
      let boardModel = {
        boardSize: 3,
        boardName: getState().app.board.boardName
      }
      let dataModel = convertToModel(getState().app.board.cells);
      Object.assign(boardModel, dataModel);
      axios.put(`${API_URL}/${id}`, boardModel)
        .then((response) => {
          // OK
        })
        .catch((err) => {
          console.info(err);
          const message = err.response.status === 409 ? ERROR_MESSAGES.NAME_ALREADY_EXISTS : ERROR_MESSAGES.DEFAULT;
          dispatch(actions.setErrorMessage(message));
          dispatch(actions.showError());
        });
    };
  },

  showModal: (isVisible) => {
    return (dispatch) => {
      dispatch({ type: AppTypeKeys.SHOW_MODAL, payload: isVisible });
    };
  },

  showError: () => {
    return (dispatch) => {
      dispatch({ type: AppTypeKeys.SHOW_ERROR, payload: true });
      setTimeout(() => {
        dispatch({ type: AppTypeKeys.SHOW_ERROR, payload: false });
      }, 2000);
    };
  },

  setErrorMessage: (message) => {
    return (dispatch) => {
      dispatch({ type: AppTypeKeys.SET_ERROR_MESSAGE, payload: message });
    };
  },

  setBoardValidity: (name) => {
    return (dispatch) => {
      const isNameValid = /^[^\s]{1,50}$/.test(name);
      dispatch({ type: AppTypeKeys.SET_BOARD_VALIDITY, payload: isNameValid });
    };
  },

  clearBoard: () => {
    return (dispatch) => {
      dispatch({ type: AppTypeKeys.CLEAR_BOARD, payload: true });
      dispatch({ type: AppTypeKeys.CLEAR_DATA, payload: true });
    };
  },

  selectCell: (id, isPlayersTurn) => {
    return (dispatch, getState) => {
      dispatch({ type: AppTypeKeys.SELECT_CELL, payload: { id, isPlayersTurn } });
      dispatch({ type: AppTypeKeys.CHANGE_PLAYERS_TURN, payload: !isPlayersTurn });
      
      const doHaveAWinner = checkForWinner(getState().app.board.cells, isPlayersTurn);
      if (doHaveAWinner) {
        dispatch({ type: AppTypeKeys.SET_WINNER, payload: doHaveAWinner });
        return;
      }
      
      const selectCell = selectAvailableCell(getState().app.board.cells);
      if (selectCell === null) {
        dispatch({ type: AppTypeKeys.SET_WINNER, payload: { id: 2 } });
        return;
      }

      if (isPlayersTurn) {
        setTimeout(() => {
          dispatch(actions.selectCell(selectCell, !isPlayersTurn));
        }, 2000);
      }
    };
  }
};

export default actions;
