import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as AvailableBattleTypes, Creators as AvailableBattleActions } from '../ducks/availableBattles';

function* getAvailableBattleUsers(action) {
  try {
    const endpoint = `api/users/list?levelDiff=${action.levelDiff}`;
    const response = yield call(twitchPokemonApi.get, endpoint);

    yield put(AvailableBattleActions.getAvailableBattleUsersSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export default function* () {
  yield takeLatest(AvailableBattleTypes.GET_AVAILABLE_BATTLE_USERS_REQUEST, getAvailableBattleUsers);
}
