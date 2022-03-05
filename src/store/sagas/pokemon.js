import { takeLatest, call, put } from 'redux-saga/effects';
import twitchPokemonApi from '../../services/twitchPokemonApi';

import { Types as PokemonTypes, Creators as PokemonActions } from '../ducks/pokemon';
import { Creators as UserActions } from '../ducks/user';

function* getPokemon(action) {
  const url = `api/users/pokemons/${action.pokemonId}`;
  try {
    const response = yield call(twitchPokemonApi.get, url);

    yield put(PokemonActions.getPokemonSuccess(response.data));
  } catch (error) {
    yield put(PokemonActions.getPokemonFailure());
  }
}

function* levelUpPokemon(action) {
  const url = `api/users/pokemons/${action.pokemonId}/levelup?deleteMove=${action.deleteMove ? action.deleteMove : ''}`;
  try {
    const response = yield call(twitchPokemonApi.post, url);

    yield put(PokemonActions.levelUpPokemonSuccess(response.data));
    yield put(UserActions.getUserRequest());

  } catch (error) {
    console.log(error.response.data);

    if (error.response.data.hasOne) {
      yield put(PokemonActions.levelUpPokemonFailure({ hasOne: error.response.data.hasOne }));
      return;
    }

    switch (error.response.data.message) {
      case 'Not enough points':
        yield put(PokemonActions.levelUpPokemonFailure({ noPoints: true }));
        break;

      case 'Need to choose a move to delete':
        const newMove = error.response.data.newMove ? error.response.data.newMove.name : error.response.data.newEvolutionMove.name;
        yield put(PokemonActions.levelUpPokemonFailure({ forgetToLearn: newMove }, error.response.data.pokemon));
        break;

      case "Can't level up pokemon that's in position Setup":
        yield put(PokemonActions.levelUpPokemonFailure({ pokemonInPosition: true }));
        break;

      default:
        break;
    }
  }
}

function* evolvePokemon(action) {
  const url = `api/users/pokemons/${action.pokemonId}/stones/${action.stoneId}${action.params ? action.params : ''}`;
  try {
    const response = yield call(twitchPokemonApi.post, url);

    action.history.push(`/pokemon/${action.pokemonId}`);
    yield put(PokemonActions.evolvePokemonSuccess());
  } catch (error) {
    if (error.response.data.hasOne) {
      yield put(PokemonActions.evolvePokemonFailure({ hasOne: error.response.data.hasOne }));
      return;
    }

    switch (error.response.data.message) {
      case 'Not enough points':
        yield put(PokemonActions.evolvePokemonFailure({ noPoints: true }));
        break;

      case 'Need to choose a move to delete':
        const newMove = error.response.data.newMove ? error.response.data.newMove.name : error.response.data.newEvolutionMove.name;
        yield put(PokemonActions.evolvePokemonFailure({ forgetToLearn: newMove }));
        break;

      default:
        console.log({ error });
    }
  }
}

function* learnMove(action) {
  try {
    const params = action.params ? action.params : '';
    const url = `api/users/pokemons/${action.pokemonId}/learn_move?moveId=${action.moveId}${params}`;

    const response = yield call(twitchPokemonApi.post, url);

    action.history.push(`/pokemon/${action.pokemonId}`);
    yield put(PokemonActions.learnMoveSuccess());
  } catch (error) {
    if (error.response.data.hasOne) {
      yield put(PokemonActions.learnMoveFailure({ hasOne: error.response.data.hasOne }));
      return;
    }

    switch (error.response.data.message) {
      case 'Not enough points':
        yield put(PokemonActions.learnMoveFailure({ noPoints: true }));
        break;

      case 'Need to choose a move to delete':
        const newMove = error.response.data.newMove.name;
        yield put(PokemonActions.learnMoveFailure({ forgetToLearn: newMove }));
        break;

      case 'Pokemon already learned this move':
        yield put(PokemonActions.learnMoveFailure({ alreadyLearned: true }));
        break;

      case "Pokemon can't learn this move":
        yield put(PokemonActions.learnMoveFailure({ cantLearn: true }));
        break;

      default:
        console.log({ error });
    }
  }
}

export default function* () {
  yield takeLatest(PokemonTypes.GET_POKEMON_REQUEST, getPokemon);
  yield takeLatest(PokemonTypes.LEVEL_UP_POKEMON_REQUEST, levelUpPokemon);
  yield takeLatest(PokemonTypes.EVOLVE_POKEMON_REQUEST, evolvePokemon);
  yield takeLatest(PokemonTypes.LEARN_MOVE_REQUEST, learnMove);
}
