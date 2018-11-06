import { IState } from './state';

export default {
  count: ({ count }: IState) => count,
  content: ({ content }: IState) => content
};
