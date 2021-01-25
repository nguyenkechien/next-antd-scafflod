// eslint-disable-next-line no-unused-vars
export default (store) => next => action => {
  console.log(`commonMiddleware`, store);
  const ret = next(action);
  switch (action.type) {
    default:
  }
  return ret;
};
