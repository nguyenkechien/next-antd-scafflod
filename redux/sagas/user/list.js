import { take, put, fork } from 'redux-saga/effects';
import { FETCH_USER_LIST } from '../../../constants/ActionTypes';
import {
  fetchUserListDataFail,
  fetchUserListDataSuccess,
} from '../../actions/user';
import api from '../../../constants/ApiUrlForBE';
import nextFetch from '../../../core/nextFetch';

/**
 * userList saga
 */
export function* fetchUserList() {
  while (true) {
    yield take(FETCH_USER_LIST);
    try {
      const res = yield nextFetch.get(api.getUserList);
      yield put(fetchUserListDataSuccess(res.result));
    } catch (e) {
      console.log(e);
      yield put(fetchUserListDataFail());
    }
  }
}

export default [fork(fetchUserList)];
