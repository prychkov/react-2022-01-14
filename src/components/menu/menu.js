import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {loadProducts} from '../../redux/actions';
import { productsLoadingSelector, productsLoadedSelector } from '../../redux/selectors';

import Loader from '../loader';
import Product from '../product';
import Basket from '../basket';

import styles from './menu.module.css';

class Menu extends Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = { error: null };

  loadProductsIfNeeded = () => {   
    const {loadProducts, restId, loading, loaded} = this.props;
    if (!loading && !loaded) {
      loadProducts(restId);
    }
  }

  componentDidMount() {
    this.loadProductsIfNeeded();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.restId !== this.props.restId) { // в текущей редакции не меняется, сделано на будущее
      this.loadProductsIfNeeded();                // для случая если в компонент меню не будет передоваться
    }                                             // props.key, тогда может поломаться и этот блок поможет
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { menu, loading, loaded } = this.props;
    /* console.log(`loading: ${loading}`);
    console.log(`loaded: ${loaded}`); */
    
    if (loading) {
      return <Loader />;
    }

    if (!loaded) {
      return <p>Нет данных</p>;
    }

    /* if (this.state.error || !loaded) {
      return <p>Меню этого ресторана сейчас недоступно :(</p>;
    } */

    if (this.state.error) {
      return <p>Меню этого ресторана сейчас недоступно :(</p>;
    }

    return (
      <div className={styles.menu}>
        <div>
          {menu.map((id) => (
            <Product key={id} id={id} />
          ))}
        </div>
        <div>
          <Basket />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return ({
    loading: productsLoadingSelector(state, props),
    loaded: productsLoadedSelector(state, props),
    state,
  });
};

const mapDispatchToProps = {
  loadProducts,
};

/* const mapDispatchToProps = (dispatch, props) => {
  console.log('mapDispatchToProps');
  return {
    loadProducts: () => dispatch(loadProducts(props.restId)),
  }
  
}; */

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
