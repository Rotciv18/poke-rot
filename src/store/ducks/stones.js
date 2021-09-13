import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getStonesListRequest: [],
  getStonesListSuccess: ['stones'],
});

const INITIAL_STATE = {
  stonesList: null,
  isLoading: true
};

const getStonesListRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const getStonesListSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  stonesList: action.stones,
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_STONES_LIST_REQUEST]: getStonesListRequest,
  [Types.GET_STONES_LIST_SUCCESS]: getStonesListSuccess,
});
