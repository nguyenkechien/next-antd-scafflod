import { message } from 'antd';
import {
  FETCH_USER_LIST_FAIL,
  FETCH_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from '../../constants/ActionTypes';
import Router from 'next/router';
import { fetchUserProfile } from '../../redux/actions/user';
import { Auth } from '../../core/Auth';

export default ({ dispatch }) => next => action => {
  const ret = next(action);
  switch (action.type) {
    case FETCH_USER_LIST_FAIL:
      message.error('Fetch user list fail');
      break;
    case USER_LOGIN_FAIL:
      message.error('Login fail');
      break;
    case USER_LOGIN_SUCCESS: {
      dispatch(fetchUserProfile());
      const next = Router.query ? Router.query.next : '';
      const redirect = next || '/';
      Router.push(redirect);
      break;
    }
    case FETCH_USER_PROFILE_FAIL: {
      Auth.isAuthenticated = false;
      break;
    }
    case FETCH_USER_PROFILE_SUCCESS: {
      Auth.isAuthenticated = true;
      break;
    }
    default:
  }
  return ret;
};
