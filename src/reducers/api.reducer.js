import { combineReducers } from 'redux';
import { ApiTypeKeys } from '../actions/api.actions';

const initialApiState = {
  boards: {
    isLoading: false,
    data: null
  }
};

const boards = (state = initialApiState.boards, action) => {
  switch (action.type) {
    case ApiTypeKeys.FETCH_BOARDS:
      return Object.assign({}, state, { data: action.payload });

    case ApiTypeKeys.FETCH_BOARDS_ISLOADING:
      return Object.assign({}, state, { isLoading: action.payload });

    default:
      return state;
  }
};

const apiReducer = combineReducers({
  boards,
});

export default apiReducer;
