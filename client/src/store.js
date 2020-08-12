import { createStore, applyMiddleware, compose } from 'redux';
import modules from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

const store = createStore(
  modules,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

export default store;
