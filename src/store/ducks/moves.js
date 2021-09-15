import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getMovesListRequest: [],
  getMovesListSuccess: ['moves'],
});

const INITIAL_STATE = {
  movesList: null,
  isLoading: true
};

const getMovesListRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const getMovesListSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  movesList: action.moves,
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_MOVES_LIST_REQUEST]: getMovesListRequest,
  [Types.GET_MOVES_LIST_SUCCESS]: getMovesListSuccess,
});
