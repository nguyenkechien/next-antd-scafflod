import {
  FETCH_SYSTEM,
  FETCH_SYSTEM_REQUEST,
  FETCH_SYSTEM_FAIL,
  FETCH_SYSTEM_SUCCESS,
} from '../../../constants/ActionTypes';

const initialState = {
  meta: {},
  header: {},
  footer: [],
};

const system = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SYSTEM:
    case FETCH_SYSTEM_REQUEST:
    case FETCH_SYSTEM_FAIL:
      return initialState;
    case FETCH_SYSTEM_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default system;
