export default (state, dispatch) => {
  return ({
    startGame: () => {
      dispatch({
        test: true
      });
    },
  });
};
