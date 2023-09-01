import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

import { scrollReducer } from './reducers/scrollReducer';
import { cartReducer } from './reducers/cartReducer';

export const store = createStore(
  combineReducers({
    scroll: scrollReducer,
    cart: cartReducer,
  }),
  applyMiddleware(thunk)
);