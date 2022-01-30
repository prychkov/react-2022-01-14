import { DECREMENT, INCREMENT, REMOVE } from './reducer/constants';

export const decrement = (id) => ({ type: DECREMENT, id });
export const increment = (id) => ({ type: INCREMENT, id });
export const remove = (id) => ({ type: REMOVE, id })
