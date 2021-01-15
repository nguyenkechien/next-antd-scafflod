const loading = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
  if (!matches) return state;
  const [, RequestName, RequestState] = matches;
  return { ...state, [RequestName]: RequestState === 'REQUEST' };
};

export default loading;
