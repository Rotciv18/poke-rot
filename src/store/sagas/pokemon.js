import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as PokemonTypes, Creators as PokemonActions } from '../ducks/pokemon';
import { Creators as UserActions } from '../ducks/user';

function* getPokemon(action) {
  const url = `api/users/pokemons/${action.pokemonId}`;
  try {
    const response = yield call(twitchPokemonApi.get, url);

    yield put(PokemonActions.getPokemonSuccess(response.data));
  } catch (error) {
    yield put(PokemonActions.getPokemonFailure());
  }
}

function* levelUpPokemon(action) {
  const url = `api/users/pokemons/${action.pokemonId}/levelup?deleteMove=${action.deleteMove ? action.deleteMove : ''}`;
  try {
    const response = yield call(twitchPokemonApi.post, url);

    yield put(PokemonActions.levelUpPokemonSuccess(response.data));
    yield put(UserActions.getUserRequest());

  } catch (error) {
    switch (error.response.data.message) {
      case 'Not enough points':
        yield put(PokemonActions.levelUpPokemonFailure({noPoints: true}));
        break;

      case 'Need to choose a move to delete':
        yield put(PokemonActions.levelUpPokemonFailure({forgetToLearn: error.response.data.newMove.name}));
        break;
    
      default:
        break;
    }
  }
}

export default function* () {
  yield takeLatest(PokemonTypes.GET_POKEMON_REQUEST, getPokemon);
  yield takeLatest(PokemonTypes.LEVEL_UP_POKEMON_REQUEST, levelUpPokemon);
}
