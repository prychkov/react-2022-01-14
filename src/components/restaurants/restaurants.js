import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { activIdSelector, activeRestaurantSelector, tabsSelector } from '../../redux/selectors';
import { changeactivetab } from '../../redux/actions';

function Restaurants({ activRestaurant, tabs, activId, changeactivetab }) {
  return (
    <div>
      <Tabs tabs={tabs} onChange={changeactivetab} activeId={activId} />
      <Restaurant restaurant={activRestaurant} />
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

const mapDispatchToProps = () => ({
  changeactivetab,
});

export default connect((state) => {
  return {
    activId: activIdSelector(state),
    activRestaurant: activeRestaurantSelector(state),
    tabs: tabsSelector(state),
  }
}, mapDispatchToProps)(Restaurants);
