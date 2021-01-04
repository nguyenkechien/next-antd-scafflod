import { all } from 'redux-saga/effects';
import userSagas from './user/index';
import commonSagas from './common';

export default function* rootSagas() {
  yield all([...commonSagas, ...userSagas]);
}
