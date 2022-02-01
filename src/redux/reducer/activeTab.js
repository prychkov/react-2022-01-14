import { CHANGEACTIVTAB } from '../constants';

export default function (state = {}, action) {
  const { type, id } = action;
  switch (type) {
    case CHANGEACTIVTAB:
      return  {...state, id};
    default:
      return state;
  }
}