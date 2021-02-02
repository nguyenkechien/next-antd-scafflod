import {
  FORM_SUBMIT_START,
  FORM_SUBMIT_STOP,
} from '../../../constants/ActionTypes';

const initialState = {
  submiting: {},
};
const form = (state = initialState, { type, payload }) => {
  switch (type) {
    case FORM_SUBMIT_START:
      return {
        ...state,
        submiting: { ...{ [payload]: true } },
      };
    case FORM_SUBMIT_STOP:
      return {
        ...state,
        submiting: { ...{ [payload]: false } },
      };

    default:
      return state;
  }
};

export default form;
