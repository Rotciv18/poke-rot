import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as PokemonsTypes, Creators as PokemonsActions } from '../ducks/pokemons';

function* getPokemons(action) {
  const headers = {
    headers: {
      Authorization: `Bearer ${action.token}`
    }
  }
  try {
    const response = yield call(twitchPokemonApi.get, 'api/users/pokemons', headers);
    response.data.forEach(pokemon => console.log(pokemon.name))

    yield put(PokemonsActions.getPokemonsSuccess(response.data));
  } catch (error) {
    yield put(PokemonsActions.getPokemonsFailure());
  }
}



export default function* () {
  yield takeLatest(PokemonsTypes.GET_POKEMONS_REQUEST, getPokemons);
}
