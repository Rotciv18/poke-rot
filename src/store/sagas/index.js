import "regenerator-runtime/runtime";
import { all } from 'redux-saga/effects';
import twitchAuth from './twitchAuth';
import pokemons from './pokemons';
import pokemon from './pokemon';

export default function* rootSaga() {
  yield all([
    pokemon(),
    pokemons(),
    twitchAuth(),
  ]);
}
