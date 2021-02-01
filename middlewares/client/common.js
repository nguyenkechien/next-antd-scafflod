/* eslint-disable */
import { FORM_SUBMIT } from '../../constants/ActionTypes';

export default store => next => action => {
  console.log(`commonMiddleware`, action);
  const { type, payload } = action;
  // const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
  // if (matches) {
  //   const [, RequestName, RequestState] = matches;
  //   if (payload && payload.formId) {
  //     RequestState === 'REQUEST' && ;
  //   }
  // }
  const ret = next(action);
  return ret;
};
