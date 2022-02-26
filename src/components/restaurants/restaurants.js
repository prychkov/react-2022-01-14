import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import Loader from '../loader';
import {
  restaurantsListSelector,
  restaurantsLoadedSelector,
  restaurantsLoadingSelector,
} from '../../redux/selectors';
import { loadRestaurants } from '../../redux/actions';

function Restaurants({ restaurants, loading, loaded, loadRestaurants }) {
  const [_activeId, setActiveId] = useState(() => {
    return restaurants[0]?.id
  });

  useEffect(() => {
    if (!loading && !loaded) loadRestaurants();
  }, [loading, loaded, loadRestaurants]);

  const tabs = useMemo(
    () => {
      return restaurants.map(({ id, name }) => ({ id, label: name }))
    },
    [restaurants]
  );

  if (loading) {
    return <Loader />;
  }
  if (!loaded) {
    return 'No data :('; 
  }

  const activeId = _activeId || restaurants[0]?.id;
  return (
    <div>
      <Tabs tabs={tabs} onChange={setActiveId} activeId={activeId} />
      <Restaurant id={activeId} />
    </div>
  );
}

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = (state) => {
  return { 
  restaurants: restaurantsListSelector(state),
  loading: restaurantsLoadingSelector(state),
  loaded: restaurantsLoadedSelector(state),
  }
};

/* const mapDispatchToProps = {
  loadRestaurants,
}; */

const mapDispatchToProps = (dispatch) => {
  return {
    loadRestaurants: () => dispatch(loadRestaurants()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
