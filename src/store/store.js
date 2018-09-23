import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { rootReducer } from 'reducers';

const initialWindowState = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const history = createHistory();

const configureStore = (initialState = initialWindowState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history),
    ),
  );

  return store;
};

export const store = configureStore();
