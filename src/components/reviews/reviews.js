import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import Loader from '../loader';
import styles from './reviews.module.css';

import { loadReviews } from '../../redux/actions';
import { reviewsLoadingSelector, reviewsLoadedSelector } from '../../redux/selectors';

const Reviews = ({ reviews, restId, loading, loaded, error, loadReviews }) => {
  useEffect(() => {
  if (!loading && !loaded) {
    loadReviews(restId);
  }}, [restId, loading, loaded, loadReviews]);

  if (loading) {
    return <Loader/>;
  }
  
  if (!loaded) {
    return 'No data :(';
  }

  if (error) return 'Error';

  return (
    <div className={styles.reviews}>
      {reviews.map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm restId={restId} />
    </div>
  );
};

Reviews.propTypes = {
  restId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    loading: reviewsLoadingSelector(state, props),
    loaded: reviewsLoadedSelector(state, props),
  }
}

const mapDispatchToProps = {
  loadReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
