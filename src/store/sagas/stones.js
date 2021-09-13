import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as StonesTypes, Creators as StonesActions } from '../ducks/stones';

function* getStones(action) {
  try {
    const response = yield call(twitchPokemonApi.get, '/api/stones');

    yield put(StonesActions.getStonesListSuccess(response.data));
  } catch (error) {
    console.log({ error });
  }
}

export default function* () {
  yield takeLatest(StonesTypes.GET_STONES_LIST_REQUEST, getStones);
}
