export const PLAYERS_ID = {
  PLAYER_ONE: 'p1',
  PLAYER_TWO: 'p2',
};

export const INIT = {
  canPlay: true, // allows to add new items to the matrix
  isTie: false, // no winners - all tiles filled
  currentPlayer: PLAYERS_ID.PLAYER_ONE, // user id, either 'p1' or 'p2'
  usedTiles: []
};

export default (state, dispatch) => {
  return ({
    startGame: () => {
      dispatch({
        ...INIT,
        [PLAYERS_ID.PLAYER_ONE]: {
          ...state[PLAYERS_ID.PLAYER_ONE],
          selectedTiles: []
        },
        [PLAYERS_ID.PLAYER_TWO]: {
          ...state[PLAYERS_ID.PLAYER_TWO],
          selectedTiles: []
        }
      });
    },
    play: (tileIdx) => {
      dispatch({
        usedTiles: [...state.usedTiles, tileIdx].sort(),
        [state.currentPlayer]: {
          ...state[state.currentPlayer],
          selectedTiles: [...state[state.currentPlayer].selectedTiles, tileIdx].sort(),
        },
        currentPlayer: state.currentPlayer === PLAYERS_ID.PLAYER_TWO? PLAYERS_ID.PLAYER_ONE : PLAYERS_ID.PLAYER_TWO
      });
    },
  });
};
