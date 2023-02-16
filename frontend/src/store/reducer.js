import { combineReducers } from 'redux';
import menuReducer from './menu';
import cartReducer from './cart';

export default combineReducers({
  menu: menuReducer,
  cart: cartReducer,
});
