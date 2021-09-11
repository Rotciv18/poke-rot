import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Creators as UserActions } from '../ducks/user';
import { Types as PokeballsTypes, Creators as PokeballsActions } from '../ducks/pokeballs';

function* buyPokeballs(action) {
  try {
    const response = yield call(twitchPokemonApi.post, 'api/pokeballs', action);

    yield put(PokeballsActions.buyPokeballsSuccess());
    yield put(UserActions.getUserRequest());
  } catch (error) {
    console.log({ error });
  }
}

export default function* () {
  yield takeLatest(PokeballsTypes.BUY_POKEBALLS_REQUEST, buyPokeballs);
}
