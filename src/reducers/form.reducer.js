import { FormTypeKeys } from '../actions/form.actions';

const initialFormState = {
  load: {
    query: ''
  },
  board: {
    name: ''
  }
};

const form = (state = initialFormState, action) => {
  switch (action.type) {
    case FormTypeKeys.CHANGE_FORM:
      const stateUpdate = {};
      stateUpdate[action.payload.form] = Object.assign({}, state[action.payload.form], action.payload.fields);
      return Object.assign({}, state, stateUpdate);

    case FormTypeKeys.RESET_FORM:
      const stateClear = {};
      stateClear[action.payload.form] = Object.assign({}, state[action.payload.form], initialFormState[action.payload.form]);
      return Object.assign({}, state, stateClear);

    default:
      return state;
  }
};

export default form;
