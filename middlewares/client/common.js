// eslint-disable-next-line no-unused-vars
export default ({ dispatch }) => next => action => {
  console.log(`commonMiddleware`, action);
  const ret = next(action);
  switch (action.type) {
    default:
  }
  return ret;
};
