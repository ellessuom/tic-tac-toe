import {
  INIT,
  extractPrevState,
} from './actions';
import Cookies from "universal-cookie";

/**
 * Initialises Data context's reducer
 * Also extrats prev state whenever it has previously been cached and stored within the browser's cookies
 */
export const initialState = (prevState) => ({
  ...INIT,
  ...extractPrevState(prevState),
});

/**
 * Handles action's dispatcher
 * Caches the new state at each mutation
 * @param state - Current state
 * @param payload - New data to be added to the current state
 */
export default (state, payload) => {
  const cookies = new Cookies();
  const newState = {...state, ...payload };
  cookies.set('ttt', newState);
  return newState;
};
