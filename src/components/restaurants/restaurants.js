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
  console.log('Start Render Restaurants', restaurants, loading, loaded, loadRestaurants);
  const [_activeId, setActiveId] = useState(() => {
    console.log('useState');
    return restaurants[0]?.id
  });
  
  console.log('_activeId', _activeId);

  useEffect(() => {
    console.log('useEffect');
    if (!loading && !loaded) loadRestaurants();
  }, [loading, loaded, loadRestaurants]);

  const tabs = useMemo(
    () => {
      console.log('useMemo');
      return restaurants.map(({ id, name }) => ({ id, label: name }))
    },
    [restaurants]
  );

  console.log('tabs', tabs);

  if (loading) {
    console.log('Loader');
    return <Loader />;
  }
  if (!loaded) {
    console.log('No data :(');
    return 'No data :('; 
  }

  const activeId = _activeId || restaurants[0]?.id;
  console.log('activeId', activeId);
  console.log('End Render Restaurants');
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
  console.log('mapStateToProps');
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
  console.log('mapDispatchToProps');
  return {
    loadRestaurants: () => dispatch(loadRestaurants()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
