import produce from 'immer';
import {FAILURE, LOAD_PRODUCTS, REQUEST, SUCCESS} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: {},
  loaded: {},
  error: null,
}

export default (state = initialState, action) => 
produce(state, (draft) => {
  const { type, restId, data, error } = action;
  switch (type) {
    case LOAD_PRODUCTS + REQUEST: {
      draft.loading[restId] = true;
      break;
    }
    case LOAD_PRODUCTS + SUCCESS: {
      draft.loading[restId] = false;
      draft.loaded[restId] = true;
      draft.error = null;
      Object.assign(draft.entities, arrToMap(data));
      break;
    }
    case LOAD_PRODUCTS + FAILURE: {
        draft.loading[restId] = false;
        draft.loaded[restId] = false;
        draft.error = error;
        break;
    }
    default:
      return;
  }
});
