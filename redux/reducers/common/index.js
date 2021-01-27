import { combineReducers } from 'redux';
import system from './system';
import loading from './loading';
import {
  COLLAPSE,
  CLOSE_COLLAPSE,
  OPEN_COLLAPSE,
} from '../../../constants/ActionTypes';

const initialState = { collapsed: true };
const common = (state = initialState, { type }) => {
  switch (type) {
    case COLLAPSE:
      return { ...state, collapsed: !state.collapsed };
    case CLOSE_COLLAPSE:
      return { ...state, collapsed: true };
    case OPEN_COLLAPSE:
      return { ...state, collapsed: false };
    default:
      return state;
  }
};

export default combineReducers({
  common,
  system,
  loading,
});
