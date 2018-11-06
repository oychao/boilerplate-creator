import { IState } from './state';

export const INCREMENT: string = 'INCREMENT';
export const DECREMENT: string = 'DECREMENT';
export const SET_CONTENT: string = 'SET_CONTENT';

export default {
  [INCREMENT](state: IState): void {
    state.count++;
  },
  [DECREMENT](state: IState): void {
    state.count--;
  },
  [SET_CONTENT](state: IState, payload: IState): void {
    state.content = payload.content;
  }
};
