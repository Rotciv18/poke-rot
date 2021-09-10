import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getPositionsRequest: [],
  getPositionsSuccess: ['positionsList'],
  takePositionRequest: ['position_id'],
});

const INITIAL_STATE = {
  positionsList: null,
  isLoading: true,
};

const getPositionsRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
  error: false
});

const getPositionsSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  positionsList: action.positionsList
});

const takePositionRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_POSITIONS_REQUEST]: getPositionsRequest,
  [Types.GET_POSITIONS_SUCCESS]: getPositionsSuccess,
  [Types.TAKE_POSITION_REQUEST]: takePositionRequest,
});
