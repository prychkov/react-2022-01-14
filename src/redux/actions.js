import { DECREMENT, INCREMENT, REMOVE, CHANGEACTIVTAB } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });
export const changeactivetab = (id) => ({ type: CHANGEACTIVTAB, id });
