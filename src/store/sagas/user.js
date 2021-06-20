import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as UserTypes, Creators as UserActions } from '../ducks/user';

function* getUser() {
  try {
    const response = yield call(twitchPokemonApi.get, 'api/users');

    yield put(UserActions.getUserSuccess(response.data));
  } catch (error) {
    yield put(UserActions.getUserFailure());
  }
}



export default function* () {
  yield takeLatest(UserTypes.GET_USER_REQUEST, getUser);
}
