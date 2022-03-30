import { Link } from 'react-router-dom';
import styles from './success.module.css';
import Button from '../button';

function OrderSuccess() {
  return (
    <div>
      <div className={styles.success} >
        'You order success';
      </div>
      <Link to="/restaurants">
        <Button primary block>
          To restaurants
        </Button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
