import { put, takeEvery } from 'redux-saga/effects';
import { FETCH_SYSTEM } from '../../../constants/ActionTypes';
import {
  fetchSystemDataFail,
  fetchSystemDataSuccess,
} from '../../actions/common';
import api from '../../../constants/ApiUrlForBE';
import nextFetch from '../../../core/nextFetch';
import logger from '../../../core/Logger';

export function* fetchSystem() {
  try {
    const res = yield nextFetch.get(api.System.getAll);
    yield put(fetchSystemDataSuccess(res.result));
  } catch (e) {
    logger.error(e);
    yield put(fetchSystemDataFail());
  }
}

export default [takeEvery(FETCH_SYSTEM, fetchSystem)];
