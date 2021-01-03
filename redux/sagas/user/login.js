/* eslint-disable no-unused-vars */
import { take, put, fork, takeEvery } from 'redux-saga/effects';
import { USER_LOGIN } from '../../../constants/ActionTypes';
import { userLoginFail, userLoginSuccess } from '../../actions/user';
import api from '../../../constants/ApiUrlForBE';
import nextFetch from '../../../core/nextFetch';
import logger from '../../../core/Logger';

/**
 * userList saga
 */
// export function* userLogin() {
//   while (true) {
//     yield take(USER_LOGIN);
//     try {
//       const res = yield nextFetch.post(api.User.login);
//       yield put(userLoginSuccess(res.result));
//     } catch (e) {
//       logger.log(e);
//       yield put(userLoginFail());
//     }
//   }
// }
export function* userLogin({ payload: data }) {
  try {
    const res = yield nextFetch.post(api.User.login, { data });
    yield put(userLoginSuccess(res.result));
  } catch (e) {
    logger.log(e);
    yield put(userLoginFail());
  }
}

export default [takeEvery(USER_LOGIN, userLogin)];
