import { connect } from 'react-redux';

import styles from './basket.module.css';
import Button from '../../button';
import { ReactComponent as Cross } from '../../../icons/cross.svg';
import { decrement, increment, remove } from '../../../redux/actions';


function BasketProduct({product, order, decrement, increment, remove }) {
  const sum = product.price * order[product.id];
  return (
    <div className={styles.flex}>
      <h5>Product: {product.name}</h5>
      <div>Amount:{order[product.id]}</div>
      <div>Sum: {sum}</div>
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
      <div className={styles.cross}>
        <Cross 
        onClick={remove}
        data-id="product-remove"
        icon="remove"
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch, props) => ({
  decrement: () => dispatch(decrement(props.product.id)),
  increment: () => dispatch(increment(props.product.id)),
  remove: () => dispatch(remove(props.product.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketProduct);