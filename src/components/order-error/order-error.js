import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../button';

import { useConvert } from '../../hooks/use-convert';

import { orderErrorSelector } from '../../redux/selectors';

import styles from './order.module.css';

function OrderError({error}) {
  const convert = useConvert();
  const errorText = error?.replace(/\$(\d+)/gi, (_, t) => convert(t));

  return (
    <div>
      <div className={styles.error}>
        {errorText}
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