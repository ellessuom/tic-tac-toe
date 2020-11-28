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

const PATTERS = [
  '012',
  '345',
  '678',
  '036',
  '147',
  '258',
  '048',
  '246',
];

export default (state, dispatch) => {
  const _playerWon = (id) => {
    if (state[id].selectedTiles.length < 3) {
      return false;
    }
    return PATTERS.some((pattern) => {
      return [...pattern].every((digit) => {
        return state[id].selectedTiles.includes(parseInt(digit));
      });
    });
  };

  const _checkCanPlay = () => {
    if (state.usedTiles.length > 8) {
      return false;
    }
    return !_playerWon('p1') && !_playerWon('p2');
  };

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
    verify: () => {
      dispatch({
        canPlay: _checkCanPlay()
      });
    }
  });
};
