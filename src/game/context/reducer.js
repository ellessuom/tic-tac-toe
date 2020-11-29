import {
  INIT,
  PLAYERS_ID,
  extractPrevState,
} from './actions';
import Cookies from "universal-cookie";

export const initialState = (prevState) => ({
  ...INIT,
  ...extractPrevState(prevState),
});

export default (state, payload) => {
  const cookies = new Cookies();
  const newState = {...state, ...payload };
  cookies.set('ttt', newState);
  return newState;
};
