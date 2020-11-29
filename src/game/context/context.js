import React from 'react';
import PropTypes from 'prop-types';
import reducer, { initialState } from './reducer';
import availableActions from './actions';
import Cookies from "universal-cookie";

const Context = React.createContext();
/**
 * Provides a common space for storing the game stats and variables
 * @param children - Game
 * @returns {JSX.Element}
 */
const DataProvider = ({ children }) => {
  const cookies = new Cookies();
  const [state, dispatch] = React.useReducer(reducer, cookies.get('ttt'), initialState);
  const actions = availableActions(state, dispatch);

  const value = React.useMemo(() => [{ ...state }, { ...actions }], [
    state, actions,
  ]);

  /**
   * Used to verify the state of the game after each action
   * The update of the state doesn't happen synchronously, therefore this operation cannot be done within the
   * actions' handler
   */
  React.useEffect(() => {
    if (state.usedTiles) {
      actions.verify();
    }

  }, [state.usedTiles]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

/**
 * Data consumer
 * Am error will be thrown only during development, whenever this function is being implemented outside of its
 * parent's scope
 * @returns {Context}
 */
export function useData() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(
      'You must use Data Provider in order to consume this context.',
    );
  }

  return context;
}

export default DataProvider;

DataProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
