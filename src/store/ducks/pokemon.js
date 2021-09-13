import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getPokemonRequest: ['pokemonId'],
  getPokemonSuccess: ['pokemon'],
  getPokemonFailure: [],
  levelUpPokemonRequest: ['pokemonId', 'deleteMove'],
  levelUpPokemonSuccess: ['levelUpData'],
  levelUpPokemonFailure: ['error'],
  evolvePokemonRequest: ['pokemonId', 'stoneId', 'params', 'history'],
  evolvePokemonSuccess: [],
  evolvePokemonFailure: ['error'],
  cleanEvolveError: []
});

const INITIAL_STATE = {
  pokemonDetails: null,
  isLoading: false,
  loaded: false,
  error: false,
  levelUpData: {},
  levelUpError: {},
  evolveError: {}
};

const getPokemonRequest = (state = INITIAL_STATE) => ({
  ...INITIAL_STATE,
  isLoading: true
});

const getPokemonSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  pokemonDetails: action.pokemon,
  loaded: true
});

const getPokemonFailure = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
  error: true
});

const levelUpPokemonRequest = (state = INITIAL_STATE) => ({
  ...state,
  levelUpError: {},
  levelUpData: {},
  isLoading: true,
});

const levelUpPokemonSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  levelUpData: action.levelUpData,
  pokemonDetails: action.levelUpData.pokemon
});

const levelUpPokemonFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  levelUpError: action.error
});

const evolvePokemonRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true
});

const evolvePokemonSuccess = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false
});

const evolvePokemonFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  evolveError: action.error
});

const cleanEvolveError = (state = INITIAL_STATE) => ({
  ...state,
  evolveError: {}
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_POKEMON_REQUEST]: getPokemonRequest,
  [Types.GET_POKEMON_SUCCESS]: getPokemonSuccess,
  [Types.GET_POKEMON_FAILURE]: getPokemonFailure,
  [Types.LEVEL_UP_POKEMON_REQUEST]: levelUpPokemonRequest,
  [Types.LEVEL_UP_POKEMON_SUCCESS]: levelUpPokemonSuccess,
  [Types.LEVEL_UP_POKEMON_FAILURE]: levelUpPokemonFailure,
  [Types.EVOLVE_POKEMON_REQUEST]: evolvePokemonRequest,
  [Types.EVOLVE_POKEMON_SUCCESS]: evolvePokemonSuccess,
  [Types.EVOLVE_POKEMON_FAILURE]: evolvePokemonFailure,
  [Types.CLEAN_EVOLVE_ERROR]: cleanEvolveError,
});
