import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { exampleReducer } from './reducers';

export const store = createStore(
  combineReducers({
    exampleReducer
  }),
  applyMiddleware(thunk)
);
