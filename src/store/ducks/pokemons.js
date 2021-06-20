import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getPokemonsRequest: ['params'],
  getPokemonsSuccess: ['pokemons'],
  getPokemonsFailure: []
});

const INITIAL_STATE = {
  pokemonList: null,
  isLoading: true,
  error: false
};

const getPokemonsRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
  error: false
});

const getPokemonsSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  pokemonList: action.pokemons,
  error: false
});

const getPokemonsFailure = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
  error: true
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_POKEMONS_REQUEST]: getPokemonsRequest,
  [Types.GET_POKEMONS_SUCCESS]: getPokemonsSuccess,
  [Types.GET_POKEMONS_FAILURE]: getPokemonsFailure,
});
