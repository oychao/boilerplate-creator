import * as types from './mutations';

export default {
  increment({ commit }) {
    commit(types.INCREMENT);
  },
  decrement({ commit }) {
    commit(types.DECREMENT);
  },
  setContent({ commit }, content) {
    commit(types.SET_CONTENT, { content });
  }
};
