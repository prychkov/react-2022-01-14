import produce from 'immer';
import { FAILURE, LOAD_USERS, REQUEST, SUCCESS } from '../constants';
import { ADD_REVIEW } from '../constants';
//import { normalizedUsers } from '../../fixtures';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, data, error, review, userId } = action;

  switch (type) {
    case LOAD_USERS + REQUEST:
      return {
        ...draft,
        loading: true,
        error: null,
      };
    case LOAD_USERS + SUCCESS:
      return {
        ...draft,
        entities: arrToMap(data),
        loading: false,
        loaded: true,
      };
    case LOAD_USERS + FAILURE:
      return {
        ...draft,
        loading: false,
        loaded: false,
        error,
      };
    case ADD_REVIEW:
      const { name } = review;
      draft[userId] = { id: userId, name };
      break;
    default:
      return draft;
  }
});
