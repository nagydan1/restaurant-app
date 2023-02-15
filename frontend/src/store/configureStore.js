import { configureStore } from '@reduxjs/toolkit';
import menu from './menu';
import api from './middleware/api-middleware';

export default function () {
  return configureStore({
    reducer: menu,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
  });
}
