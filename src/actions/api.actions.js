import axios from 'axios';

const API_URL = 'http://localhost:3000/api/boards';

export const ApiTypeKeys = {
  FETCH_BOARDS: 'FETCH_BOARDS',
  FETCH_BOARDS_ISLOADING: 'FETCH_BOARDS_ISLOADING',
}

const actions = {

  getBoards: (nameSegment) => {
    return (dispatch) => {
      dispatch({ type: ApiTypeKeys.FETCH_BOARDS_ISLOADING, payload: true });
      const fetchUrl = nameSegment
        ? `${API_URL}?boardNameFragment=${nameSegment}`
        : API_URL;
      axios.get(fetchUrl)
        .then(items => dispatch({ type: ApiTypeKeys.FETCH_BOARDS, payload: items.data }))
        .catch((err) => {
          console.info(err);
          dispatch({ type: ApiTypeKeys.FETCH_BOARDS, payload: null });
        })
        .then(() => dispatch({ type: ApiTypeKeys.FETCH_BOARDS_ISLOADING, payload: false }));
    };
  },
};

export default actions;
