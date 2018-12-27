import produce from 'immer';

import { IAction } from '../../store/type';
import { IAppReduxState } from './type';
import * as actionTypes from './actionTypes';

export default (
  state: IAppReduxState = {
    count: 0,
    text: ''
  },
  { type, payload }: IAction
) => {
  return produce(state, (draft: any) => {
    switch (type) {
      case actionTypes.ADD:
        draft.count += payload.num;
        break;
      case actionTypes.INPUT:
        draft.text = payload.text;
        break;
      default:
    }
    return draft;
  });
};
