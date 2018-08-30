import produce from 'immer';

import { IAction } from '../../store/type';
import { IAppReduxState } from './type';
import * as actionTypes from './actionTypes';

export default (
  state: IAppReduxState = {
    count: 0
  },
  action: IAction
) => {
  const { type, payload } = action;
  return produce(state, draft => {
    switch (type) {
      case actionTypes.ADD:
        draft.count += payload.num;
      default:
    }
    return draft;
  });
};
