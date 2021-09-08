import "regenerator-runtime/runtime";
import { all } from 'redux-saga/effects';
import twitchAuth from './twitchAuth';
import pokemons from './pokemons';
import pokemon from './pokemon';
import user from './user';
import setup from './setup';
import battles from './battles';
import availableBattles from './availableBattles';

export default function* rootSaga() {
  yield all([
    pokemon(),
    pokemons(),
    twitchAuth(),
    user(),
    setup(),
    battles(),
    availableBattles(),
  ]);
}
