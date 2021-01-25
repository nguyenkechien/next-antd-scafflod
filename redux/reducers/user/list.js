import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_FAIL,
  FETCH_USER_LIST_SUCCESS,
  USER_LOGOUT,
} from '../../../constants/ActionTypes';

const initialState = {
  list: [],
};

const list = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGOUT:
    case FETCH_USER_LIST:
    case FETCH_USER_LIST_REQUEST:
    case FETCH_USER_LIST_FAIL:
      return initialState;
    case FETCH_USER_LIST_SUCCESS:
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
};

export default list;
