import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getUserBattlesRequest: [],
  getUserBattlesSuccess: ['battles'],
  scheduleBattleRequest: ['battle_date', 'invitation_id']
});

const INITIAL_STATE = {
  battleInvitations: null,
  battleSchedules: null,
  allSchedules: null,
  isLoading: true
};

const getUserBattlesRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const getUserBattlesSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  battleInvitations: action.battles.battleInvitations,
  battleSchedules: action.battles.battleSchedules,
  allSchedules: action.battles.allSchedules
});

const scheduleBattleRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_USER_BATTLES_REQUEST]: getUserBattlesRequest,
  [Types.GET_USER_BATTLES_SUCCESS]: getUserBattlesSuccess,
  [Types.SCHEDULE_BATTLE_REQUEST]: scheduleBattleRequest,
});
