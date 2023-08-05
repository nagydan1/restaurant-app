import { combineReducers } from 'redux';
import menuReducer from './menu';
import cartReducer from './cart';
import uiReducer from './ui';

export default combineReducers({
  menu: menuReducer,
  cart: cartReducer,
  ui: uiReducer,
});
