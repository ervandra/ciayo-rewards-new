import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

export const initStore = (initialState = {}) =>
  createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
