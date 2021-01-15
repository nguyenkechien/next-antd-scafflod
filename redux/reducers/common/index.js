import { combineReducers } from 'redux';
import system from './system';
import loading from './loading';

export default combineReducers({
  system,
  loading,
});
