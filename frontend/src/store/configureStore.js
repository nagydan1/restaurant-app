/* eslint-disable func-names */
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import api from './middleware/api-middleware';

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
  });
}
