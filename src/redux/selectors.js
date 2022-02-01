import { createSelector } from 'reselect';

const restaurantsSelector = (state) => state.restaurants;
const productsSelector = (state) => state.products;
const orderSelector = (state) => state.order;

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

export const activIdSelector = createSelector(
  [restaurantsSelector],
  (restaurants) =>
    restaurants['a757a0e9-03c1-4a2a-b384-8ac21dbe2fb2'].id
);

export const activeRestaurantSelector = createSelector(
  [restaurantsSelector, activIdSelector],
  (restaurants, idRestaurant) =>
  restaurants[idRestaurant]
);


export const tabsSelector = createSelector(
  [restaurantsSelector],
  (restaurants) => (
    Object.keys(restaurants)
      .map((productId) => ({
        id: restaurants[productId].id,
        label: restaurants[productId].name,
      }))
  )
);