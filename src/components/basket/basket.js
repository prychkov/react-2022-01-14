import { connect } from 'react-redux';

function Basket({amount, restaurants}) {
  
  return (
    <div></div>
  );
}

const mapStateToProps = (state) => ({
  amount: state.order || 0,
});

export default connect(mapStateToProps)(Basket);