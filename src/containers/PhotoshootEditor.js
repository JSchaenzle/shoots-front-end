import { connect } from 'react-redux';
import EditShoot from '../components/EditShoot.jsx';
import { requestUpdatePhotoshoot, requestDeletePhotoshoot } from '../actions/photoshootActions.js';
import { browserHistory } from 'react-router';
import { WebRequestData, required, optional } from '../utils/WebRequestData.js';

const editShootData = new WebRequestData([
  new required("id"),
  new optional("name"),
  new optional("date"),
  new optional("description"),
  new optional("price"),
  new optional("completed"),
  new optional("miles_traveled", "milesTraveled"),
  new optional("hours_shooting", "hoursShooting"),
  new optional("hours_editing", "hoursEditing"),
]);

const mapStateToProps = (state, ownProps) => {
  let photoshootId = Number(ownProps.params.photoshootId);
  let userId = state.accounts.activeSession.user.id;
  let shoots = state.photoshoots.usersPhotoshoots[userId] || [];

  return {photoshoot: shoots.find(s => (s.id === photoshootId))};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePhotoshootClick: (details) => {
      const requestData = editShootData.extract(details)
      dispatch(requestUpdatePhotoshoot(requestData))
               .then(() => browserHistory.push("/photoshoots"));
    },
    onDeletePhotoshootClick: (id) => {
      dispatch(requestDeletePhotoshoot(id))
        .then(() => browserHistory.push("/photoshoots"));
    }
  };
};

export const PhotoshootEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditShoot);

