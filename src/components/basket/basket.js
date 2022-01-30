import { connect } from 'react-redux';
import BasketItem from './basketItem';

function Basket({amount, restaurants}) {
  const products = restaurants.map(
    restaurant => restaurant.menu.filter(
      product => Object.keys(amount).includes(product.id))).flat();
  
  const sum = products.reduce((sum, item) => sum + amount[item.id] * item.price, 0);
  
  return (
    <div>
      <div>
        {products.map((product) =>(
          <BasketItem key={product.id} product={product} />
        ))}
      </div>
      <div>
        Total: {sum} $
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  amount: state.order || 0,
});

export default connect(mapStateToProps)(Basket);