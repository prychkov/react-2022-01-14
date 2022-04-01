import { Link } from 'react-router-dom';
import Button from '../button';
import styles from './success.module.css';

function OrderSuccess() {
  return (
    <h1>
      <p>Congratulations! Your order has been successfully created!</p>
      <div className={styles.actions} >
        <Link to="/restaurants">
          <Button primary block>
            back to restaurants
          </Button>
        </Link>
      </div>
    </h1>    
  );
}

export default OrderSuccess;
