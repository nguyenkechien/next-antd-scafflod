import { put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_USER_LIST,
  USER_LOGIN,
  FETCH_USER_PROFILE,
} from '../../../constants/ActionTypes';
import {
  fetchUserListDataFail,
  fetchUserListDataSuccess,
  userLoginFail,
  userLoginSuccess,
  fetchUserProfileFail,
  fetchUserProfileSuccess,
} from '../../actions/user';
import Endpoint from '../../../constants/ApiUrlForBE';
import nextFetch from '../../../core/nextFetch';
import logger from '../../../core/Logger';
import { Auth } from '../../../core/Auth';

/**
 * userList saga
 */
export function* fetchUserList() {
  try {
    const res = yield nextFetch.get(Endpoint.User.getUserList);
    yield put(fetchUserListDataSuccess(res.result));
  } catch (e) {
    logger.log(e);
    yield put(fetchUserListDataFail(e));
  }
}

export function* userLogin({ payload: data }) {
  try {
    const res = yield nextFetch.post(Endpoint.User.login, { data });
    yield put(userLoginSuccess(res.result));
  } catch (e) {
    logger.error(e);
    yield put(userLoginFail(e));
  }
}

export function* fetchUserProfile({ payload: req }) {
  try {
    const config = {
      headers: { Authorization: 'Bearer ' + Auth.getAuthTokenOnServer(req) },
    };
    const res = yield nextFetch.get(Endpoint.User.getUserProfile, config);
    yield put(fetchUserProfileSuccess(res.result));
  } catch (e) {
    logger.error(e);
    yield put(fetchUserProfileFail(e));
  }
}

export default [
  takeEvery(USER_LOGIN, userLogin),
  takeEvery(FETCH_USER_LIST, fetchUserList),
  takeEvery(FETCH_USER_PROFILE, fetchUserProfile),
];
