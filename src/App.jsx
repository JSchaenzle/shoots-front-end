import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import {logOut} from './actions/accountActions';

const createHandlers = function(dispatch) {
  return {
    handleLogOut: () => {
      dispatch(logOut());
      browserHistory.push('/account-access')
    }
  };
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }

  render() {
    return (
      <div className="wrapper">
        <nav className="navigation">
          <div className="container">
            <a className="navigation-title">Shootz</a>
            <input id="logout-button" className="button-outline" type='submit' value="Log out" onClick={this.handlers.handleLogOut} ></input>
          </div>
          <div className="navigation-list">
            <ul >
              <li className="navigation-item">
                <strong>
                  <u><Link className="navigation-link" to="/photoshoots">Photoshoots</Link></u>
                </strong>
              </li>
              <li className="navigation-item">
                <strong>
                  <u><Link className="navigation-link" to="/expenses">Expenses</Link></u>
                </strong>
              </li>
              <li className="navigation-item">
                <strong>
                  <u><Link className="navigation-link" to="/reports">Reports</Link></u>
                </strong>
              </li>
            </ul>
          </div>
        </nav>
        <div className="nav-spacer"></div>
        {this.props.children}
      </div>
    );
  }
}

export default connect()(App);

