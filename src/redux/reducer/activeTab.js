import { CHANGEACTIVTAB } from '../constants';

export default function (state = {}, action) {
  const { type, id } = action;
  switch (type) {
    case CHANGEACTIVTAB:
      return  { id };
    default:
      return state;
  }
}