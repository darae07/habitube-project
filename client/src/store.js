import { createStore , applyMiddleware } from 'redux';
import modules from './modules';

const store = createStore(modules)

export default store;