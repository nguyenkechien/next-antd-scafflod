import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_FAIL,
  FETCH_USER_LIST_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_SUCCESS,
} from '../../constants/ActionTypes';
import { RoleType } from '../../constants/ConstTypes';
import { Auth } from '../../core/util';
import logger from './../../core/Logger';
import router from 'next/router';

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

export const userLogout = () => {
  Auth.deleteAuthToken();
  router.push(Auth.redirectTo);
  return { type: USER_LOGOUT };
};

export const fetchUserListData = () => ({ type: FETCH_USER_LIST });

export const fetchUserListDataSuccess = payload => ({
  type: FETCH_USER_LIST_SUCCESS,
  payload,
});

export const fetchUserListDataFail = () => ({ type: FETCH_USER_LIST_FAIL });

export const fetchUserProfile = (payload = '') => ({
  type: FETCH_USER_PROFILE,
  payload,
});

export const fetchUserProfileFail = () => ({ type: FETCH_USER_PROFILE_FAIL });

export const fetchUserProfileSuccess = payload => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload,
});
