import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getUserRequest: [],
  getUserSuccess: ['user'],
  getUserFailure: []
});

const INITIAL_STATE = {
  user: null,
  isLoading: true,
  error: false
};

const getUserRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const getUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  user: action.user,
  error: false,
  isLoading: false
});

const getUserFailure = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
  user: {},
  error: true
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,
});
