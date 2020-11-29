export const PLAYERS_ID = {
  PLAYER_ONE: 'p1',
  PLAYER_TWO: 'p2',
};

export const INIT = {
  canPlay: true, // Allows to add new items to the matrix
  isTie: false, // Used to easily handle this scenario and display proper feedback
  currentPlayer: PLAYERS_ID.PLAYER_ONE, // Keeps track of the current player
  usedTiles: [], // List of indexes of the used tiles from the matrix
  winnerPattern: '', // String including indexes of the winning tiles
  winner: '', // Player id, used for display proper feedback
  [PLAYERS_ID.PLAYER_ONE]: { // Player one data
    wins: 0, // Track of victories
    selectedTiles: [] // Track of selected tiles - Used to correctly highlight them in the matrix
  },
  [PLAYERS_ID.PLAYER_TWO]: {
    wins: 0,
    selectedTiles: []
  },
};

/**
 * Extracts cached state
 * @param prevState - Same data from INIT
 */
export const extractPrevState = (prevState) => {
  if (!prevState) {
    return {};
  }
 const override = prevState.winner? {
      currentPlayer: INIT.currentPlayer,
      usedTiles: INIT.usedTiles,
      winnerPattern: INIT.winnerPattern,
      winner: INIT.winnerPattern,
      [PLAYERS_ID.PLAYER_ONE]: {
        ...prevState[PLAYERS_ID.PLAYER_ONE],
        selectedTiles: [],
      },
      [PLAYERS_ID.PLAYER_TWO]: {
        ...prevState[PLAYERS_ID.PLAYER_TWO],
        selectedTiles: [],
      },
  } : {};
  return {
    ...prevState,
    ...override,
  };
};

/**
 * List of indexes needed to win a game
 */
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

/**
 * Data Actions
 * Allows to mutate the structure of the Data Context by providing a set of functions to be used externally
 * @param state
 * @param dispatch
 */
export default (state, dispatch) => {
  /**
   * Verifies if a given player has a winning pattern
   * @param id
   * @returns {boolean}
   * @private
   */
  const _playerWon = (id) => {
    if (state[id].selectedTiles.length < 3) {
      return false;
    }

    return PATTERS.some((pattern) => { /** At least one pattern is needed to win  */
      const match = [...pattern].every((digit) => { /** All indexes within the pattern are needed to win */
        return state[id].selectedTiles.includes(parseInt(digit));
      });
      if (match) {
        /** If a match has been found, it saves the pattern to highlight the right tiles for enhanced feedback */
        dispatch({
          winnerPattern: pattern
        });
      }
      return match;
    });
  };

  /**
   * Verifies if it's still possible to add more marks to the game
   * @returns {boolean}
   * @private
   */
  const _checkCanPlay = () => {
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
    }).every(Boolean); // Both users must return true (no one won) in order to keep playing
  };

  return ({
    /**
     * Handles the restart of the game, when the footer's button is pressed
     */
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
    /**
     * Handles the placement of each mark on the matrix and selection of the players' turn
     * @param tileIdx - index of the tile where to place the new mark
     */
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
    /**
     * Asynchronously used to check the condition of the game
     */
    verify: () => {
      dispatch({
        canPlay: _checkCanPlay()
      });

      if (state.usedTiles.length > 8) {
        dispatch({
          isTie: true,
        });
      }
    }
  });
};
