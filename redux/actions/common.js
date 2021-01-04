import {
  FETCH_SYSTEM,
  FETCH_SYSTEM_FAIL,
  FETCH_SYSTEM_SUCCESS,
} from '../../constants/ActionTypes';

export const fetchSystemData = () => ({ type: FETCH_SYSTEM });

export const fetchSystemDataSuccess = payload => ({
  type: FETCH_SYSTEM_SUCCESS,
  payload,
});

export const fetchSystemDataFail = () => ({ type: FETCH_SYSTEM_FAIL });
