import {FAILURE, LOAD_PRODUCTS, REQUEST, SUCCESS} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: {},
  loaded: {},
  error: null,
}

export default (state = initialState, action) => {
  const { type, restId, data, error } = action;
  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return {
        ...state,
        loading: {[restId]: true},
        //error: null,
      };
    case LOAD_PRODUCTS + SUCCESS:
      const {entities, loaded} = state;
      return {
        ...state,
        loading: {[restId]: false},
        loaded: {...loaded, [restId]: true},
        entities: Object.assign(entities, arrToMap(data)),
      };
    case LOAD_PRODUCTS + FAILURE:
      return {
        ...state,
        loading: {[restId]: false},
        loaded: {[restId]: false},
        error,
      };
    default:
      return state;
  }
};
