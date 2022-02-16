import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './basket.module.css';
import itemStyles from './basket-item/basket-item.module.css';
import BasketItem from './basket-item';
import Button from '../button';
import { orderProductsSelector, totalSelector } from '../../redux/selectors';

function Basket({ title = 'Basket', total, orderProducts }) {
  if (!total) {
    return (
      <div className={styles.basket}>
        <h4 className={styles.title}>Select a meal from the list</h4>
      </div>
    );
  }

  return (
    <div className={styles.basket}>
      <h4 className={styles.title}>{title}</h4>
      {orderProducts.map(({ product, amount, subtotal }) => (
        <BasketItem
          product={product}
          amount={amount}
          key={product.id}
          subtotal={subtotal}
        />
      ))}
      <hr className={styles.hr} />
      <div className={itemStyles.basketItem}>
        <div className={itemStyles.name}>
          <p>Total</p>
        </div>
        <div className={itemStyles.info}>
          <p>{`${total} $`}</p>
        </div>
      </div>
      <Button primary block>
        checkout
      </Button>
    </div>
  );
}

Basket.propTypes = {
  title: PropTypes.string,
  total: PropTypes.number.isRequired,
  orderProducts: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    product: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    }).isRequired,
    subtotal: PropTypes.number.isRequired,
  })).isRequired
}

export default connect((state) => {
  return {
    total: totalSelector(state),
    orderProducts: orderProductsSelector(state),
  };
})(Basket);
