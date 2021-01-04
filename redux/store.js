import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';
import userMiddleware from '../middlewares/client/user';

const customMiddleware = [userMiddleware];

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => {
  customMiddleware.forEach(item => middleware.push(item));

  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    const { logger } = require('redux-logger');
    middleware.push(logger);
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default),
    );
  }

  return store;
}

export default configureStore;
