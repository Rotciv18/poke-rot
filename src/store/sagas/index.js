import "regenerator-runtime/runtime";
import { all } from 'redux-saga/effects';
import twitchAuth from './twitchAuth';
import pokemons from './pokemons';

export default function* rootSaga() {
  yield all([
    pokemons(),
    twitchAuth(),
  ]);
}
