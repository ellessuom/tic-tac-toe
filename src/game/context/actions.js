export const PLAYERS_ID = {
  PLAYER_ONE: 'p1',
  PLAYER_TWO: 'p2',
};

export const INIT = {
  canPlay: true, // allows to add new items to the matrix
  isTie: false, // no winners - all tiles filled
  currentPlayer: PLAYERS_ID.PLAYER_ONE, // user id, either 'p1' or 'p2'
  usedTiles: [],
  winnerPattern: '',
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
      const match = [...pattern].every((digit) => {
        return state[id].selectedTiles.includes(parseInt(digit));
      });
      if (match) {
        dispatch({
          winnerPattern: pattern
        });
      }
      return match;
    });
  };

  const _checkCanPlay = () => {
    if (state.usedTiles.length > 8) {
      return false;
    }
    const _dispatchWinner = (playerId) => dispatch({
      winner: playerId,
      [playerId]: {
        ...state[playerId],
        wins: state[playerId].wins + 1
      },
    });

    return [
      PLAYERS_ID.PLAYER_ONE,
      PLAYERS_ID.PLAYER_TWO,
    ].map((playerId) => {
      if (_playerWon(playerId)) {
        _dispatchWinner(playerId);
        return false;
      }
      return true;
    }).every(Boolean);
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
