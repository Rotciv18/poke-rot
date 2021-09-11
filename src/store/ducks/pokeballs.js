import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  buyPokeballsRequest: ['pokeballs', 'greatballs', 'ultraballs'],
  buyPokeballsSuccess: [],
});

const INITIAL_STATE = {
  isLoading: false
};

const buyPokeballsRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true
});

const buyPokeballsSuccess = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false
});

export default createReducer(INITIAL_STATE, {
  [Types.BUY_POKEBALLS_REQUEST]: buyPokeballsRequest,
  [Types.BUY_POKEBALLS_SUCCESS]: buyPokeballsSuccess,
});
