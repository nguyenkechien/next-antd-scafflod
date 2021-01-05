import { message } from 'antd';
import {
  FETCH_USER_LIST_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from '../../constants/ActionTypes';
import Router from 'next/router';
import { fetchUserProfile } from '../../redux/actions/user';

export default ({ dispatch }) => next => action => {
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
      dispatch(fetchUserProfile());
      break;
    }
    default:
  }
  return ret;
};
