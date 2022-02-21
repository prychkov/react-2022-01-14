import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './product.module.css';
import Button from '../button';
import Loader from '../loader';
import {
  amountSelector,
  productSelector,
  productsLoadingSelector,
  productsLoadedSelector } from '../../redux/selectors';
import { decrement, increment, loadProducts } from '../../redux/actions';

function Product({ product, amount, decrement, increment, loading, loaded, loadProducts }) {
  useEffect(() => {
    if(!loading && !loaded) loadProducts();
  }, [loading, loaded, loadProducts]);

  if(loading) return <Loader />;
  if(!loaded) return 'No data :(';

  return (
    <div className={styles.product} data-id="product">
      <div className={styles.content}>
        <div>
          <h4 className={styles.title}>{product.name}</h4>
          <p className={styles.description}>{product.ingredients.join(', ')}</p>
          <div className={styles.price}>{product.price} $</div>
        </div>
        <div>
          <div className={styles.counter}>
            <div className={styles.count} data-id="product-amount">
              {amount}
            </div>
            <div className={styles.buttons}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
  //fetchData: PropTypes.func,
  // from connect
  amount: PropTypes.number,
  decrement: PropTypes.func,
  increment: PropTypes.func,
};

/* const mapStateToProps = (state, props) => ({
  amount: amountSelector(state, props),
  product: productSelector(state, props),
}); */

const mapStateToProps = (state, props) => {
  return {
    amount: amountSelector(state, props),
    product: productSelector(state, props),
    loading: productsLoadingSelector(state, props),
    loaded: productsLoadedSelector(state, props),
  }
};

// const mapDispatchToProps = {
//   decrement,
//   increment,
// };

const mapDispatchToProps = (dispatch, props) => ({
  decrement: () => dispatch(decrement(props.id)),
  increment: () => dispatch(increment(props.id)),
  loadProducts: () => dispatch(loadProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
