import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getSetupRequest: [],
  getSetupSuccess: ['pokemons'],
  getSetupFailure: [],
  removeFromSetupRequest: ['pokemonId'],
  removeFromSetupFailure: [],
  addToSetupRequest: ['pokemonId', 'history'],
  addToSetupFailure: [],
});

const INITIAL_STATE = {
  pokemonList: null,
  isLoading: true,
};

const getSetupRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const getSetupSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  pokemonList: action.pokemons,
});

const getSetupFailure = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
});

const removeFromSetupRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const removeFromSetupFailure = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
});

const addToSetupRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const addToSetupFailure = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_SETUP_REQUEST]: getSetupRequest,
  [Types.GET_SETUP_SUCCESS]: getSetupSuccess,
  [Types.GET_SETUP_FAILURE]: getSetupFailure,
  [Types.REMOVE_FROM_SETUP_REQUEST]: removeFromSetupRequest,
  [Types.REMOVE_FROM_SETUP_FAILURE]: removeFromSetupFailure,
  [Types.ADD_TO_SETUP_REQUEST]: addToSetupRequest,
  [Types.ADD_TO_SETUP_FAILURE]: addToSetupFailure,
});
