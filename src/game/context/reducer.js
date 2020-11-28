import {
  INIT,
  PLAYERS_ID
} from './actions';

export const initialState = {
  ...INIT,
  [PLAYERS_ID.PLAYER_ONE]: {
    wins: 0,
    selectedTiles: []
  },
  [PLAYERS_ID.PLAYER_TWO]: {
    wins: 0,
    selectedTiles: []
  },
};

export default (state, payload) => {
  return {...state, ...payload };
};
