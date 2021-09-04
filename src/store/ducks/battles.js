import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getUserBattlesRequest: [],
  getUserBattlesSuccess: ['battles']
});

const INITIAL_STATE = {
  battleInvitations: null,
  battleSchedules: true,
  isLoading: true
};

const getUserBattlesRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
  error: false
});

const getUserBattlesSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  battleInvitations: action.battles.battleInvitations,
  battleSchedules: action.battles.battleSchedules
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_USER_BATTLES_REQUEST]: getUserBattlesRequest,
  [Types.GET_USER_BATTLES_SUCCESS]: getUserBattlesSuccess
});
