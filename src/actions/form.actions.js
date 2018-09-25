export const FormTypeKeys = {
  CHANGE_FORM: 'CHANGE_FORM',
  RESET_FORM: 'RESET_FORM',
}

const actions = {
  changeForm: (form, change) => {
    return (dispatch) => {
      // TODO validation
      dispatch({
        type: FormTypeKeys.CHANGE_FORM,
        payload: {
          form,
          fields: Object.assign({}, change),
        },
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
