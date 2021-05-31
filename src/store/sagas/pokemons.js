import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as PokemonsTypes, Creators as PokemonsActions } from '../ducks/pokemons';

function* getPokemons() {
  try {
    const response = yield call(twitchPokemonApi.get, 'api/users/pokemons');

    yield put(PokemonsActions.getPokemonsSuccess(response.data));
  } catch (error) {
    yield put(PokemonsActions.getPokemonsFailure());
  }
}



export default function* () {
  yield takeLatest(PokemonsTypes.GET_POKEMONS_REQUEST, getPokemons);
}
