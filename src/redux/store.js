import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from './middleware/logger';
import generateId from './middleware/generateId';

import reducer from './reducer';

const enhancer = applyMiddleware(logger, generateId);

export default createStore(reducer,composeWithDevTools(enhancer));
