import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as BattlesTypes, Creators as BattlesActions } from '../ducks/battles';

function* getBattles(action) {
  try {
    const battleInvitationsEndpoint = 'api/users/battles/invitations';
    const battleSchedulesEndpoint = 'api/users/battles/schedules';

    const invitationsResponse = yield call(twitchPokemonApi.get, battleInvitationsEndpoint);
    const schedulesResponse = yield call(twitchPokemonApi.get, battleSchedulesEndpoint);

    yield put(BattlesActions.getUserBattlesSuccess({
      battleInvitations: invitationsResponse.data,
      battleSchedules: schedulesResponse.data
    }));
  } catch (error) {
    console.log(error);
  }
}



export default function* () {
  yield takeLatest(BattlesTypes.GET_USER_BATTLES_REQUEST, getBattles);
}
