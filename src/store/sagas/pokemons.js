import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as PokemonsTypes, Creators as PokemonsActions } from '../ducks/pokemons';

function* getPokemons(action) {
  try {
    const endpoint = `api/users/pokemons${action.params ? action.params : ''}`;
    const response = yield call(twitchPokemonApi.get, endpoint);

    yield put(PokemonsActions.getPokemonsSuccess(response.data));
  } catch (error) {
    yield put(PokemonsActions.getPokemonsFailure());
  }
}



export default function* () {
  yield takeLatest(PokemonsTypes.GET_POKEMONS_REQUEST, getPokemons);
}
