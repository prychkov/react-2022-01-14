import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './basketItem.module.css';
import Button from '../../button';
import { decrement, increment, remove } from '../../../redux/actions';
import { ReactComponent as Cross } from '../../../icons/cross.svg';

function BasketItem({ product, amount, decrement, increment, fetchData, remove }) {
  useEffect(() => {
    fetchData?.(product.id);
  }, []); // eslint-disable-line

  return (
    <div className={styles.basket}>
      <div>
        Product: {product.name}, amount: {amount}, total: {product.price * amount}$
      </div>
      <div className={styles.basket}>
          <Button
            onClick={decrement}
            data-id="product-decrement"
            icon="minus"
          />
          <Button
            onClick={increment}
            data-id="product-increment"
            icon="plus"
          />
          <Cross
            onClick={remove}
            data-id="product-remove"
            icon="remove"
          />
      </div>
      
      
    </div>
  );
}

BasketItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  fetchData: PropTypes.func,
  // from HOC counter
  amount: PropTypes.number,
  decrement: PropTypes.func,
  increment: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  amount: state.order[props.product.id] || 0,
});

// const mapDispatchToProps = {
//   decrement,
//   increment,
// };

const mapDispatchToProps = (dispatch, props) => ({
  decrement: () => dispatch(decrement(props.product.id)),
  increment: () => dispatch(increment(props.product.id)),
  remove: () => dispatch(remove(props.product.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItem);
