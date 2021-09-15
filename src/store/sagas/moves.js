import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as MovesTypes, Creators as MovesActions } from '../ducks/moves';

function* getMovesList() {
  try {
    const response = yield call(twitchPokemonApi.get, '/api/moves');

    yield put(MovesActions.getMovesListSuccess(response.data));
  } catch (error) {
    console.log({ error });
  }
}

export default function* () {
  yield takeLatest(MovesTypes.GET_MOVES_LIST_REQUEST, getMovesList);
}
