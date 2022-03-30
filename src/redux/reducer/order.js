import { DECREMENT, INCREMENT, REMOVE, POST_ORDER, REQUEST, SUCCESS, FAILURE } from '../constants';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null
}

// { [productId]: amount }
export default function (state = initialState, action) {
  const { type, id, error } = action;
  const {entities} = state;
  switch (type) {
    case INCREMENT:
      return {
        ...state,
        entities: {...entities, [id]: (entities[id] || 0) + 1 },
      };
    case DECREMENT:
      return {
        ...state,
        entities: {
          ...entities,
          [id]: entities[id] > 0 ? (entities[id] || 0) - 1 : 0
        },
      };
    case REMOVE:
      return {
        ...state, 
        entities: {...entities, [id]: 0},
      };
    case POST_ORDER + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_ORDER + SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: {},
      };
    case POST_ORDER + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      }
    default:
      return state;
  }
}
