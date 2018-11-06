import * as types from './mutations';

export default {
  increment({ commit }: any) {
    commit(types.INCREMENT);
  },
  decrement({ commit }: any) {
    commit(types.DECREMENT);
  },
  setContent({ commit }: any, content: string) {
    commit(types.SET_CONTENT, { content });
  }
};
