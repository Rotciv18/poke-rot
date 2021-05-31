import { takeLatest, put } from 'redux-saga/effects';
import Authentication from '../../util/Authentication/Authentication';

import { Types as AuthTypes, Creators as AuthActions } from '../ducks/twitchAuth';

function* getAuth(action) {
  const { twitchExtension } = action;
  if (!twitchExtension) {
    yield put(AuthActions.getAuthFailure());
  }
  const auth = new Authentication();
  auth.setToken(action.token, action.userId);
  localStorage.setItem('token', action.token);

  yield put(AuthActions.getAuthSuccess(auth));
}

export default function* () {
  yield takeLatest(AuthTypes.GET_AUTH_REQUEST, getAuth);
}
