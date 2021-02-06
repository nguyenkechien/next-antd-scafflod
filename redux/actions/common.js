import {
  FETCH_SYSTEM_REQUEST,
  FETCH_SYSTEM_FAIL,
  FETCH_SYSTEM_SUCCESS,
  COLLAPSE,
  OPEN_COLLAPSE,
  CLOSE_COLLAPSE,
  FORM_SUBMIT_START,
  FORM_SUBMIT_STOP,
} from '../../constants/ActionTypes';
import api from './../../constants/ApiUrlForBE';
import { nextFetch } from './../../core/nextFetch';
import logger from './../../core/Logger';
import { CookieKey } from '../../constants/ConstTypes';

/**
 *
 * @param {{getState: Function, dispatch: VoidFunction}} param0
 * @param {String} readerToken
 */
export const fetchSystemData = async ({ dispatch }, readerToken) => {
  dispatch({ type: FETCH_SYSTEM_REQUEST });
  try {
    const res = await nextFetch.get(api.System.getAll, {
      headers: { [CookieKey.xAuth]: readerToken },
    });
    dispatch(fetchSystemDataSuccess(res.result));
  } catch (e) {
    logger.error(e);
    dispatch(fetchSystemDataFail());
  }
};

export const fetchSystemDataSuccess = payload => ({
  type: FETCH_SYSTEM_SUCCESS,
  payload,
});

export const fetchSystemDataFail = () => ({ type: FETCH_SYSTEM_FAIL });

/**
 *
 * @param {Array<String>} actions
 */
export const createLoadingSelector = actions => state => {
  return actions.some(action => state.common.loading[action]);
};

export const toogleCollapse = () => ({ type: COLLAPSE });
export const openCollapse = () => ({ type: OPEN_COLLAPSE });
export const closeCollapse = () => ({ type: CLOSE_COLLAPSE });

/**
 *
 * @param {String} payload  Form ID
 */
export const startSubmit = payload => ({ type: FORM_SUBMIT_START, payload });

/**
 *
 * @param {String} payload  Form ID
 */
export const stopSubmit = payload => ({ type: FORM_SUBMIT_STOP, payload });
