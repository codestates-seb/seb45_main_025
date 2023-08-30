import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
// import { exampleReducer } from './reducers';
import scrollReducer from './reducers/scrollReducer';

export const store = createStore(
  combineReducers({
    scroll: scrollReducer,
  }),
  applyMiddleware(thunk)
);
