import apiActions from './api.actions';

export const FormTypeKeys = {
  CHANGE_FORM: 'CHANGE_FORM',
  RESET_FORM: 'RESET_FORM',
}

const actions = {
  changeForm: (change) => {
    return (dispatch) => {
      dispatch({
        type: FormTypeKeys.CHANGE_FORM,
        payload: change
      });
    };
  },

  resetForm: () => {
    return (dispatch) => {
      dispatch({
        type: FormTypeKeys.RESET_FORM,
        payload: null
      });
    };
  }
};

export default actions;
