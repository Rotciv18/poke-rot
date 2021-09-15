import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as SetupTypes, Creators as SetupActions } from '../ducks/setup';

function* getSetup() {
  try {
    const response = yield call(twitchPokemonApi.get, 'api/setups');

    yield put(SetupActions.getSetupSuccess(response.data.pokemons));
  } catch (error) {
    yield put(SetupActions.getSetupFailure());
  }
}

function* removeFromSetup(action) {
  try {
    yield call(twitchPokemonApi.delete, `api/setups/${action.pokemonId}`);

    yield put(SetupActions.getSetupRequest());
  } catch (error) {
    if (error.response.data.hasOne) {
      yield put(SetupActions.removeFromSetupFailure({ hasOne: error.response.data.hasOne }));
    } else {
      yield put(SetupActions.removeFromSetupFailure());
      console.log({ error });
    }
  }
}

function* addToSetup(action) {
  try {
    yield call(twitchPokemonApi.post, `api/setups/${action.pokemonId}`);

    yield put(SetupActions.getSetupRequest());
    action.history.push('/setup');
  } catch (error) {
    if (error.response.data.hasOne) {
      yield put(SetupActions.addToSetupFailure({ hasOne: error.response.data.hasOne }));
    } else {
      yield put(SetupActions.addToSetupFailure());
      console.log({ error });
    }
  }
}

export default function* () {
  yield takeLatest(SetupTypes.GET_SETUP_REQUEST, getSetup);
  yield takeLatest(SetupTypes.REMOVE_FROM_SETUP_REQUEST, removeFromSetup);
  yield takeLatest(SetupTypes.ADD_TO_SETUP_REQUEST, addToSetup);
}
