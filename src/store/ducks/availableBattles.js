import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getAvailableBattleUsersRequest: ['levelDiff'],
  getAvailableBattleUsersSuccess: ['users'],
});

const INITIAL_STATE = {
  availableBattleUsers: null,
  isLoading: true
};

const getAvailableBattleUsersRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const getAvailableBattleUsersSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  availableBattleUsers: action.users,
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_AVAILABLE_BATTLE_USERS_REQUEST]: getAvailableBattleUsersRequest,
  [Types.GET_AVAILABLE_BATTLE_USERS_SUCCESS]: getAvailableBattleUsersSuccess,
});
