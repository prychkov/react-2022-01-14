//import produce from 'immer';
import {
  ADD_REVIEW,
  FAILURE,
  LOAD_RESTAURANTS,
  REQUEST,
  SUCCESS,
} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, restId, reviewId, data, error } = action;
  switch (type) {
    case LOAD_RESTAURANTS + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_RESTAURANTS + SUCCESS:
      return {
        ...state,
        entities: arrToMap(data),
        loading: false,
        loaded: true,
      };
    case LOAD_RESTAURANTS + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };
    case ADD_REVIEW:
      const {entities} = state;
      const restaurant = entities[restId];
      return {
        ...state,
        entities: {...entities, [restId]: {...restaurant, reviews: [...restaurant.reviews, reviewId]}},
      }
    default:
      return state;
  }
};
