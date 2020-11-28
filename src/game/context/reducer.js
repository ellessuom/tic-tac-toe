export const initialState = {
  test: false
};

export default (state, payload) => {
  return {...state, ...payload };
};
