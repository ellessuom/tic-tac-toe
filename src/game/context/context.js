import React from 'react';
import PropTypes from 'prop-types';
import reducer, { initialState } from './reducer';
import availableActions from './actions';
import Cookies from "universal-cookie";

const Context = React.createContext();

const DataProvider = ({ children }) => {
  const cookies = new Cookies();
  const [state, dispatch] = React.useReducer(reducer, cookies.get('ttt'), initialState);
  const actions = availableActions(state, dispatch);

  const value = React.useMemo(() => [{ ...state }, { ...actions }], [
    state, actions,
  ]);

  React.useEffect(() => {
    if (state.usedTiles) {
      actions.verify();
    }

  }, [state.usedTiles]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

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
