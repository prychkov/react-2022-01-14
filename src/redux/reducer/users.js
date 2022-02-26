//import produce from 'immer';
import { LOAD_USERS, REQUEST, SUCCESS, FAILURE, ADD_REVIEW } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, data, error, review, userId } = action;
  switch (type) {
    case LOAD_USERS + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_USERS + SUCCESS:
      return {
        ...state,
        entities: arrToMap(data),
        loading: false,
        loaded: true,
      };
    case LOAD_USERS + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };
    case ADD_REVIEW:
      const {entities} = state;
      const { name } = review;
      return {
        ...state,
        entities: {...entities, [userId]: {id: userId, name}},
      }
    default:
      return state;
  }
};
