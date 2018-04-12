import * as actionTypes from './actionTypes';
import { IAction } from '../../store/type';

export const add = (num: number): IAction => ({
    type: actionTypes.ADD,
    payload: {
        num,
    },
});
