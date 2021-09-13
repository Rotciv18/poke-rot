import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as BattlesTypes, Creators as BattlesActions } from '../ducks/battles';
import { Creators as UserActions } from '../ducks/user';

const battleInvitationsEndpoint = 'api/users/battles/invitations';
const sentInvitationsEndpoint = 'api/users/battles/invitations/sent';
const battleSchedulesEndpoint = 'api/users/battles/schedules';
const allSchedulesEndpoint = 'api/battles/schedules';

function* getBattles(action) {
  try {
    const invitationsResponse = yield call(twitchPokemonApi.get, battleInvitationsEndpoint);
    const schedulesResponse = yield call(twitchPokemonApi.get, battleSchedulesEndpoint);
    const allSchedulesResponse = yield call(twitchPokemonApi.get, allSchedulesEndpoint);
    const sentInvitationsResponse = yield call(twitchPokemonApi.get, sentInvitationsEndpoint);

    yield put(BattlesActions.getUserBattlesSuccess({
      battleInvitations: invitationsResponse.data,
      battleSchedules: schedulesResponse.data,
      allSchedules: allSchedulesResponse.data,
      sentInvitations: sentInvitationsResponse.data
    }));
  } catch (error) {
    console.log(error);
  }
}

function* scheduleBattle(action) {
  const scheduleBattleEndpoint = `api/users/battles/invitations/${action.invitation_id}/schedule`;
  try {
    const scheduleBattleResponse = yield call(
      twitchPokemonApi.post,
      scheduleBattleEndpoint,
      { battle_date: action.battle_date }
    );

    if (scheduleBattleResponse.status === 200) {

      yield put(BattlesActions.getUserBattlesRequest());
    } else {
      console.log(scheduleBattleResponse);
    }

  } catch (error) {
    console.log({ error });
  }
}

function* sendBattleInvitation(action) {
  try {
    const response = yield call(twitchPokemonApi.post, battleInvitationsEndpoint, {
      challenged_id: action.challenged_id,
      challenge_type: action.challenge_type,
      challenger_available_dates: action.challenger_available_dates,
      position_id: action.position_id
    });

    yield put(UserActions.getUserRequest());
    action.history.push('/battles');
  } catch (error) {
    console.log({ error });
  }
}

export default function* () {
  yield takeLatest(BattlesTypes.GET_USER_BATTLES_REQUEST, getBattles);
  yield takeLatest(BattlesTypes.SCHEDULE_BATTLE_REQUEST, scheduleBattle);
  yield takeLatest(BattlesTypes.SEND_BATTLE_INVITATION_REQUEST, sendBattleInvitation);
}
