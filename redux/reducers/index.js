import { combineReducers } from 'redux';
import common from './common';
import home from './home';
import user from './user';

export default combineReducers({
  common,
  home,
  user,
});
