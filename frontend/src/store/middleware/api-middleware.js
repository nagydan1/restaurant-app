/* eslint-disable consistent-return */
import * as actions from '../api';

const api = (state) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url, method, body, onStart, onSuccess, onError,
  } = action.payload;

  if (onStart) state.dispatch({ type: onStart });
  next(action);

  try {
    const response = await fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();

    state.dispatch(actions.apiCallSuccess(responseData));
    if (onSuccess) state.dispatch({ type: onSuccess, payload: responseData });
  } catch (error) {
    state.dispatch(actions.apiCallFailed(error.message));
    if (onError) state.dispatch({ type: onError, payload: error.message });
  }
};

export default api;
