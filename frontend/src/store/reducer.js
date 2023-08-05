import { combineReducers } from 'redux';
import menuReducer from './menu';
import cartReducer from './cart';
import orderReducer from './order';
import uiReducer from './ui';

export default combineReducers({
  menu: menuReducer,
  cart: cartReducer,
  order: orderReducer,
  ui: uiReducer,
});
