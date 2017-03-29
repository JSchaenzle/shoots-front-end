import { connect } from 'react-redux';
import NewShoot from '../components/NewShoot.jsx';
import { requestAddPhotoshoot } from '../actions/photoshootActions.js';
import { browserHistory } from 'react-router';
import { WebRequestData, required, optional } from '../utils/WebRequestData.js';

const newShootData = new WebRequestData([
  new required("name"),
  new required("date"),
  new optional("description"),
  new optional("price"),
  new optional("completed"),
  new optional("miles_traveled", "milesTraveled"),
  new optional("hours_shooting", "hoursShooting"),
  new optional("hours_editing", "hoursEditing"),
]);

const mapStateToProps = (state) => {
  return {photoshoots: state.photoshoots};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPhotoshootClick: (details) => {
      const requestData = newShootData.extract(details)
      dispatch(requestAddPhotoshoot(requestData))
        .then(() => browserHistory.push("/photoshoots"));
    }
  };
};

export const PhotoshootCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShoot);
