import { connect } from 'react-redux';
import BasketProduct from './basketProduct'

function Basket({ order, restaurants}) {
    
  const menus = restaurants.map((restaurant) => restaurant.menu).flat();

  const products = [];
  const totalArr = [];
  
  for (let id of Object.keys(order)) {
    for (let menu of menus) {
      if(id === menu.id) {
        products.push(menu);
      }
    }
  }

  for (let id of Object.keys(order)) {
    for (let menu of menus) {
      if(id === menu.id) {
        totalArr.push(menu.price * order[id]); 
      }
    }
  }

  const total = totalArr.reduce((sum, current) => sum + current);
  
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