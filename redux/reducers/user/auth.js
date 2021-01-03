import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from '../../../constants/ActionTypes';

const initialState = {};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
    case USER_LOGIN_FAIL:
      return initialState;
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default auth;
