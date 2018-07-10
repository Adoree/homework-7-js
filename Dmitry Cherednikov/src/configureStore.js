import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pokeApp from './reducers/index';

const configureStore = () => {
  const middlewares = [thunk];

  return createStore(
    pokeApp,
    applyMiddleware(...middlewares),
  )
};

export default configureStore;