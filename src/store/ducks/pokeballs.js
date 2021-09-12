import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getPokeballsListRequest: [],
  getPokeballsListSuccess: ['pokeballs'],
  buyPokeballsRequest: ['pokeballs', 'greatballs', 'ultraballs'],
  buyPokeballsSuccess: [],
});

const INITIAL_STATE = {
  pokeballsList: null,
  isLoading: true
};

const getPokeballsListRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true
});

const getPokeballsListSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  pokeballsList: action.pokeballs,
  isLoading: false
});

const buyPokeballsRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true
});

const buyPokeballsSuccess = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_POKEBALLS_LIST_REQUEST]: getPokeballsListRequest,
  [Types.GET_POKEBALLS_LIST_SUCCESS]: getPokeballsListSuccess,
  [Types.BUY_POKEBALLS_REQUEST]: buyPokeballsRequest,
  [Types.BUY_POKEBALLS_SUCCESS]: buyPokeballsSuccess,
});
