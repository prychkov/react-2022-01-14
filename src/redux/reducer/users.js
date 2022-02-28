import produce from 'immer';
import { LOAD_USERS, REQUEST, SUCCESS, FAILURE, ADD_REVIEW } from '../constants';
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
    case LOAD_USERS + REQUEST: {
        draft.loading = true;
        draft.error = null;
        break;
      }
    case LOAD_USERS + SUCCESS: {
        draft.entities =  arrToMap(data)
        draft.loading = false
        draft.loaded  = true
        break;
      }
    case LOAD_USERS + FAILURE: {
        draft.loading = false;
        draft.loaded = false;
        draft.error = error;
        break;
      }
    case ADD_REVIEW:
      const { name } = review;
        draft.entities[userId] = {id: userId, name};
        break;
    default:
      return draft;
  }
});
