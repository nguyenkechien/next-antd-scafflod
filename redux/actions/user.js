import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_FAIL,
  FETCH_USER_LIST_SUCCESS,
} from '../../constants/ActionTypes';

export const fetchUserListData = () => ({ type: FETCH_USER_LIST });

export const fetchUserListDataSuccess = payload => ({
  type: FETCH_USER_LIST_SUCCESS,
  payload,
});

export const fetchUserListDataFail = () => ({ type: FETCH_USER_LIST_FAIL });
