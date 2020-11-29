import {
  INIT,
  PLAYERS_ID
} from './actions';
import Cookies from "universal-cookie";

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
  const cookies = new Cookies();
  const newState = {...state, ...payload };
  cookies.set('ttt', newState);
  return newState;
};
