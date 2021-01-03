import { message } from 'antd';
import {
  FETCH_USER_LIST_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from '../../constants/ActionTypes';
import Router from 'next/router';
export default () => next => action => {
  const ret = next(action);
  console.log(`middlewares`, ret);
  switch (action.type) {
    case FETCH_USER_LIST_FAIL:
      message.error('Fetch user list fail');
      break;
    case USER_LOGIN_FAIL:
      message.error('Login fail');
      break;
    case USER_LOGIN_SUCCESS: {
      const next = Router.query ? Router.query.next : '';
      const redirect = next || '/';
      Router.push(redirect);
      break;
    }
    default:
  }
  return ret;
};
