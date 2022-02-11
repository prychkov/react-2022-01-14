import { createSelector } from 'reselect';

const restaurantsSelector = (state) => state.restaurants;
const productsSelector = (state) => state.products;
const orderSelector = (state) => state.order;
const reviewsSelector = (state) => state.reviews;
const usersSelector = (state) => state.users;

export const restaurantsListSelector = createSelector(
  [restaurantsSelector],
  (restaurants) => 
  Object.values(restaurants)
);

export const orderProductsSelector = createSelector(
  [productsSelector, orderSelector],
  (products, order) =>
    Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
      }))
);

export const totalSelector = createSelector(
  [orderProductsSelector],
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);

export const averageRatingSelector = createSelector(
  [reviewsSelector],
  (reviews) => {
    const total = Object.values(reviews).reduce((acc, { rating }) => acc + rating, 0);
    return Math.round(total / reviews.length);
  }
);

export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];

export const userSelector = createSelector(
  reviewSelector,
  usersSelector,
  (review, users) =>
  users[review.userId].name
);