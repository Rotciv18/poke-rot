import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as PositionsTypes, Creators as PositionsActions } from '../ducks/positions';

const positionsEndpoint = 'api/positions';
const userPositionsEndpoint = 'api/users/positions';

function* getPositions() {
  try {
    const response = yield call(twitchPokemonApi.get, positionsEndpoint);

    yield put(PositionsActions.getPositionsSuccess(response.data));
  } catch (error) {
    console.log({ error });
  }
}

function* takePosition(action) {
  try {
    const response = yield call(twitchPokemonApi.post, `${userPositionsEndpoint}/${action.position_id}`);

    yield put(PositionsActions.getPositionsRequest());
  } catch (error) {
    console.log({ error })
  }
}

export default function* () {
  yield takeLatest(PositionsTypes.GET_POSITIONS_REQUEST, getPositions);
  yield takeLatest(PositionsTypes.TAKE_POSITION_REQUEST, takePosition);
}
