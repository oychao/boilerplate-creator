export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_CONTENT = 'SET_CONTENT';

export default {
  [INCREMENT](state) {
    state.count++;
  },
  [DECREMENT](state) {
    state.count--;
  },
  [SET_CONTENT](state, payload) {
    state.content = payload.content;
  }
};
