import produce from 'immer';
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
  //console.log('Reducer restaurants', `state: ${state}, action: ${action}`);
  const { type, restId, reviewId, data, error } = action;
  //console.log('Reducer restaurants before switch', `type: ${type}, restId: ${restId}, reviewId: ${reviewId}, data: ${data}, error: ${error}`);

  switch (type) {
    case LOAD_RESTAURANTS + REQUEST:
      //console.log('Reducer restaurants LOAD_RESTAURANTS + REQUEST');
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_RESTAURANTS + SUCCESS:
      //console.log('Reducer restaurants LOAD_RESTAURANTS + SUCCESS');
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
      return produce(state, (draft) => {
        draft.entities[restId].reviews.push(reviewId);
      });
    default:
      return state;
  }
};
