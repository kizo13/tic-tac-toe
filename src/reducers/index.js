import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app.reducer';
import form from './form.reducer';

export const rootReducer = combineReducers({
  app,
  form,
  routing: routerReducer,
});
