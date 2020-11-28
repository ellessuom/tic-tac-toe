import React from 'react';
import PropTypes from 'prop-types';
import reducer, { initialState } from './reducer';
import availableActions from './actions';

const Context = React.createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const actions = availableActions(state, dispatch);

  const value = React.useMemo(() => [{ ...state }, { ...actions }], [
    state, actions,
  ]);

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
