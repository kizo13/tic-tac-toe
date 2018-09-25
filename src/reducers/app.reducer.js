import { combineReducers } from 'redux';
import { AppTypeKeys } from '../actions/app.actions';

const initialAppState = {
  boards: {
    isLoading: false,
    data: null
  },
  board: {
    isLoading: false,
    isValid: true,
    id: null,             // string
    boardSize: null,      // integer [min 3, max 7]
    boardName: null,      // string [min 3, max 50]
    cells: [null, null, null, null, null, null, null, null, null]
  },
  data: {
    showError: false,
    errorMessage: '',
    showBoardModal: false,
    isPlayersTurn: true,
    winner: {
      id: null,
      combo: []
    }
  }
};

const boards = (state = initialAppState.boards, action) => {
  switch (action.type) {
    case AppTypeKeys.FETCH_BOARDS:
      return Object.assign({}, state, { data: action.payload });

    case AppTypeKeys.FETCH_BOARDS_ISLOADING:
      return Object.assign({}, state, { isLoading: action.payload });

    case AppTypeKeys.DELETE_BOARD:
      const newData = state.data.filter(b => b.id !== action.payload);
      return Object.assign({}, state, { data: newData });

    default:
      return state;
  }
};

const board = (state = initialAppState.board, action) => {
  switch (action.type) {
    case AppTypeKeys.FETCH_BOARD:
      return Object.assign({}, state, action.payload );

    case AppTypeKeys.FETCH_BOARD_ISLOADING:
      return Object.assign({}, state, { isLoading: action.payload });
      
    case AppTypeKeys.SELECT_CELL:
      const cellValue = action.payload.isPlayersTurn ? 0 : 1;
      const newCells = state.cells.map ((c, idx) => action.payload.id === idx ? cellValue : c);
      return Object.assign({}, state, { cells: newCells });

    case AppTypeKeys.CLEAR_BOARD:
      return Object.assign({}, state, initialAppState.board);

    case AppTypeKeys.SET_BOARD_VALIDITY:
      return Object.assign({}, state, { isValid: action.payload });

    default:
      return state;
  }
};

const data = (state = initialAppState.data, action) => {
  switch (action.type) {

    case AppTypeKeys.CHANGE_PLAYERS_TURN:
      return Object.assign({}, state, { isPlayersTurn: action.payload });

    case AppTypeKeys.SET_WINNER:
      return Object.assign({}, state, { winner: action.payload });

    case AppTypeKeys.SHOW_MODAL:
      return Object.assign({}, state, { showBoardModal: action.payload });
    
    case AppTypeKeys.SHOW_ERROR:
      return Object.assign({}, state, { showError: action.payload });

    case AppTypeKeys.SET_ERROR_MESSAGE:
      return Object.assign({}, state, { errorMessage: action.payload });

    case AppTypeKeys.CLEAR_DATA:
      return Object.assign({}, state, initialAppState.data);

    default:
      return state;
  }
};

const appReducer = combineReducers({
  boards,
  board,
  data
});

export default appReducer;
