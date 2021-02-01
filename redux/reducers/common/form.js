import {
  FORM_SUBMIT_START,
  FORM_SUBMIT_STOP,
} from '../../../constants/ActionTypes';

const initialState = {};
const form = (state = initialState, { type, payload }) => {
  switch (type) {
    case FORM_SUBMIT_START:
      return {
        ...state,
        [payload]: true,
      };
    case FORM_SUBMIT_STOP:
      return {
        ...state,
        [payload]: false,
      };

    default:
      return state;
  }
};

export default form;
