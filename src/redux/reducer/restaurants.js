import { ADDREVIEW } from '../constants';
import { normalizedRestaurants} from '../../fixtures';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({...acc, [restaurant.id]: restaurant}),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, restId, reviewId } = action;

  switch (type) {
    case ADDREVIEW:
      const restaurant = restaurants[restId];
      return {
        ...restaurants,
        [restId]: {
          ...restaurant,
          reviews: [...restaurant.reviews, reviewId],
        }
      }
    default:
      return restaurants;
  }
};
