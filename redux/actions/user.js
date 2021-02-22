import {
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_FAIL,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../../constants/ActionTypes';
import { RoleType } from '../../constants/ConstTypes';
import { Auth } from '../../core/Auth';
import router from 'next/router';

export const userLogin = payload => ({ type: USER_LOGIN_REQUEST, payload });

export const userLoginSuccess = (payload = {}) => {
  Auth.saveAuthToken(payload.token);
  return { type: USER_LOGIN_SUCCESS };
};

export const userLoginFail = () => ({ type: USER_LOGIN_FAIL });

export const userLogout = () => {
  Auth.deleteAuthToken();
  router.push(Auth.redirectTo);
  return { type: USER_LOGOUT };
};

export const fetchUserListData = () => ({ type: FETCH_USER_LIST_REQUEST });

export const fetchUserListDataSuccess = payload => ({
  type: FETCH_USER_LIST_SUCCESS,
  payload,
});

export const fetchUserListDataFail = () => ({ type: FETCH_USER_LIST_FAIL });

export const fetchUserProfile = () => ({ type: FETCH_USER_PROFILE_REQUEST });

export const fetchUserProfileFail = () => ({ type: FETCH_USER_PROFILE_FAIL });

export const fetchUserProfileSuccess = payload => {
  const role = RoleType[payload.position];
  const customPayload = {
    username: payload.username,
    email: payload.email,
    isAuthenticated: true,
    role,
  };

  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    payload: customPayload,
  };
};
