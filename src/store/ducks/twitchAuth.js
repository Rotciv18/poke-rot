import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getAuthRequest: ['token', 'userId'],
  getAuthSuccess: ['auth'],
  getAuthFailure: [],
});

const INITIAL_STATE = {
  auth: null,
  error: false,
  isLoading: false
};

const getAuthRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true
});

const getAuthSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  auth: action.auth.state,
  error: false,
  isLoading: false
});

const getAuthFailure = (state = INITIAL_STATE) => ({
  ...state,
  error: true,
  isLoading: false
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_AUTH_REQUEST]: getAuthRequest,
  [Types.GET_AUTH_SUCCESS]: getAuthSuccess,
  [Types.GET_AUTH_FAILURE]: getAuthFailure,
});
