import { FormTypeKeys } from '../actions/form.actions';

const initialFormState = {
  query: ''
};

const form = (state = initialFormState, action) => {
  switch (action.type) {
    case FormTypeKeys.CHANGE_FORM:
      return Object.assign({}, state, { query: action.payload });

    case FormTypeKeys.RESET_FORM:
      return Object.assign({}, state.query, { query: '' });

    default:
      return state;
  }
};

export default form;
