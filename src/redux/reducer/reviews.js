import produce from 'immer';
import { LOAD_REVIEWS, REQUEST, SUCCESS, FAILURE, ADD_REVIEW } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: {},
  loaded: {},
  error: null,
}

export default produce((draft = initialState, action) => {
  const { type, restId, data, error, review, reviewId, userId } = action;

  switch (type) {
    case LOAD_REVIEWS + REQUEST: {
      draft.loading[restId] = true;
        draft.error = null;
        break;
    }
    case LOAD_REVIEWS + SUCCESS: {
        draft.loading[restId] = false;
        draft.loaded[restId] = true;
        Object.assign(draft.entities, arrToMap(data));
        break;
    }
    case LOAD_REVIEWS + FAILURE: {
        draft.loading[restId] = false;
        draft.loaded[restId] = false;
        draft.error = error;
        break;
    }
    case ADD_REVIEW:
      const { text, rating } = review;
      draft.entities[reviewId] = { id: reviewId, userId, text, rating };
        break;
    default:      
      return draft;
  }
});
