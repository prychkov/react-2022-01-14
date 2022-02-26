import { LOAD_REVIEWS, REQUEST, SUCCESS, FAILURE, ADD_REVIEW } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: {},
  loaded: {},
  error: null,
}

export default (state = initialState, action) => {
  const { type, restId, data, error, review, reviewId, userId } = action;
  switch (type) {
    case LOAD_REVIEWS + REQUEST:
      return {
        ...state,
        loading: {[restId]: true },
      }
    case LOAD_REVIEWS + SUCCESS:
      const {entities, loaded} = state;
      return {
        ...state,
        loading: {[restId]: false},
        loaded: {...loaded, [restId]: true},
        entities: Object.assign(entities, arrToMap(data)),
        //entities: {...entities, ...arrToMap(data)}, // то же самое что строчка выше
      }
    case LOAD_REVIEWS + FAILURE:
      return {
        ...state,
        loading: {[restId]: false},
        loaded: {[restId]: false},
        error: error,
      }
    case ADD_REVIEW:
      const { text, rating } = review;
      return {
        ...state,
        entities: {...entities, [reviewId]: { id: reviewId, userId, text, rating }},
      };
    default:      
      return state;
  }
};
