import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../loader';
import Rate from '../../rate';
import styles from './review.module.css';

import { reviewWitUserSelector, usersLoadingSelector, usersLoadedSelector } from '../../../redux/selectors';
import { loadUsers } from '../../../redux/actions';

const Review = ({ user, text, rating, loading, loaded, loadUsers }) => {
  useEffect(() => {
    if(!loading && !loaded) loadUsers();
  }, [loading, loaded, loadUsers]);

  if(loading) return <Loader />;
  if(!loaded) return 'No data :(';
  return (
    <div className={styles.review} data-id="review">
      <div className={styles.content}>
        <div>
          <h4 className={styles.name} data-id="review-user">
            {user}
          </h4>
          <p className={styles.comment} data-id="review-text">
            {text}
          </p>
        </div>
        <div className={styles.rate}>
          <Rate value={rating} />
        </div>
      </div>
    </div>
  );
};

Review.propTypes = {
  user: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.number.isRequired,
};

Review.defaultProps = {
  user: 'Anonymous',
};

// const mapStateToProps = (state, props) => ({
//   ...reviewWitUserSelector(state, props),
// });

// const mapStateToProps = (state, props) => reviewWitUserSelector(state, props);

//const mapStateToProps = reviewWitUserSelector;

const mapStateToProps = (state, props) => ({
  ...reviewWitUserSelector(state, props),
  loading: usersLoadingSelector(state, props),
  loaded: usersLoadedSelector(state, props),
});

const mapDispatchToProps = (dispatch) => ({
    loadUsers: () => dispatch(loadUsers()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Review);
