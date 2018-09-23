import axios from 'axios';

import { history } from '../store/store';
import { convertToArray, selectAvailableCell, checkForWinner } from '../helpers/boardHelper';

const API_URL = 'http://localhost:3000/api/boards';

export const AppTypeKeys = {
  FETCH_BOARDS: 'FETCH_BOARDS',
  FETCH_BOARDS_ISLOADING: 'FETCH_BOARDS_ISLOADING',
  FETCH_BOARD: 'FETCH_BOARD',
  FETCH_BOARD_ISLOADING: 'FETCH_BOARD_ISLOADING',
  DELETE_BOARD: 'DELETE_BOARD',

  SELECT_CELL: 'SELECT_CELL',
  CHANGE_PLAYERS_TURN: 'CHANGE_PLAYERS_TURN',
  SET_WINNER: 'SET_WINNER'
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
          dispatch({ type: AppTypeKeys.FETCH_BOARDS, payload: null });
        })
        .then(() => dispatch({ type: AppTypeKeys.FETCH_BOARDS_ISLOADING, payload: false }));
    };
  },

  getBoardById: (id) => {
    return (dispatch) => {
      dispatch({ type: AppTypeKeys.FETCH_BOARD_ISLOADING, payload: true });
      axios.get(`${API_URL}/${id}`)
        .then((item) => {
          const data = {
            id: item.data.id,
            boardSize: item.data.boardSize,
            boardName: item.data.boardName,
            cells: convertToArray(item.data)
          }
          dispatch({ type: AppTypeKeys.FETCH_BOARD, payload: data });
          history.push('/board');
        })
        .catch((err) => {
          console.info(err);
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
        });
    };
  },

  selectCell: (id, isPlayersTurn) => {
    return (dispatch, getState) => {
      dispatch({ type: AppTypeKeys.SELECT_CELL, payload: { id, isPlayersTurn } });
      dispatch({ type: AppTypeKeys.CHANGE_PLAYERS_TURN, payload: !isPlayersTurn });
      
      const doHaveAWinner = checkForWinner(getState().app);
      if (doHaveAWinner) {
        dispatch({ type: AppTypeKeys.SET_WINNER, payload: doHaveAWinner });
        return;
      }

      const selectCell = selectAvailableCell(getState().app.board.cells);
      if (selectCell === null) {
        // TODO: handle draw situation
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
