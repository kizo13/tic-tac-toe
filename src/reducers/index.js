import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import api from './api.reducer';
import form from './form.reducer';

export const rootReducer = combineReducers({
  api,
  form,
  routing: routerReducer,
});
