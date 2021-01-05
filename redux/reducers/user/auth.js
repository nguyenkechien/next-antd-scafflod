import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_SUCCESS,
} from '../../../constants/ActionTypes';

const initialState = {};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
    case USER_LOGIN_FAIL:
    case USER_LOGOUT:
    case FETCH_USER_PROFILE_FAIL:
      return initialState;
    case USER_LOGIN_SUCCESS:
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        ...payload,
        ...{ isAuthenticated: true },
      };
    case FETCH_USER_PROFILE:
      return { ...state };
    default:
      return state;
  }
};

export default auth;
