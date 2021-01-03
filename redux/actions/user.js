import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_FAIL,
  FETCH_USER_LIST_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from '../../constants/ActionTypes';
import { RoleType } from '../../constants/ConstTypes';
import { Auth } from '../../core/util';
import logger from './../../core/Logger';

export const fetchUserListData = () => ({ type: FETCH_USER_LIST });

export const fetchUserListDataSuccess = payload => ({
  type: FETCH_USER_LIST_SUCCESS,
  payload,
});

export const fetchUserListDataFail = () => ({ type: FETCH_USER_LIST_FAIL });

export const userLogin = payload => ({ type: USER_LOGIN, payload });

export const userLoginSuccess = (payload = {}) => {
  logger.log('action', payload);
  const role = RoleType[payload.position];
  Auth.saveAuthToken(payload.token);
  const isAuthenticated = Auth.isAuthenticated;
  const customPayload = { role, isAuthenticated };
  return {
    type: USER_LOGIN_SUCCESS,
    payload: customPayload,
  };
};

export const userLoginFail = () => ({ type: USER_LOGIN_FAIL });
