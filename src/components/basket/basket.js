import { connect } from 'react-redux';
import BasketProduct from './basketProduct'

function Basket({ products, total}) {  
  return (
    <div>
      {products.map((product) => (
        <BasketProduct key={product.id} product={product}/>
      ))}
      
      <h2>Total: {total}</h2>
    </div>
  )
}

const mapStateToProps = (state) => {
  const productsAll = state.restaurants.map((restaurant) => restaurant.menu).flat();
  const orderProducts = Object.keys(state.order).filter((productId) => state.order[productId] > 0);
  const products = orderProducts.map(productId => productsAll.find(product => product.id === productId));
  const total = products.reduce((sum, product) => sum + product.price * state.order[product.id], 0);
  return ({
    products,
    total,
  });
};


export default connect(mapStateToProps)(Basket);