import { connect } from 'react-redux';
import BasketProduct from './basketProduct'

function Basket({ order, restaurants}) {

  const productsAll = restaurants.map((restaurant) => restaurant.menu).flat();

  const orderProducts = Object.keys(order).filter((productId) => order[productId] > 0);

  const products = orderProducts.map(productId => productsAll.find(product => product.id === productId));

  const total = products.reduce((sum, product) => sum + product.price * order[product.id], 0);
  
  return (
    <div>
      {products.map((product) => (
        <BasketProduct key={product.id} product={product}/>
      ))}
      
      <h2>Total: {total}</h2>
    </div>
  )
}

const mapStateToProps = (state) => ({
  order: state.order,
  restaurants: state.restaurants,
});

export default connect(mapStateToProps)(Basket);