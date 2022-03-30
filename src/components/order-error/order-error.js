import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './order.module.css';
import Button from '../button';
import { orderErrorSelector } from '../../redux/selectors';

function OrderError({error}) {
  return (
    <div>
      <div className={styles.error}>
        {error}
      </div>
      <Link to="/checkout">
        <Button primary block>
          To checkout
        </Button>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  error: orderErrorSelector(state),
});

export default connect(mapStateToProps)(OrderError);