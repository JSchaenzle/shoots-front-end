import { connect } from 'react-redux';
import LoginCreateAccount, {CREATE_MODE, LOGIN_MODE} from '../components/LoginCreateAccount.jsx';
import {
  requestCreateAccountAndSignIn,
  requestSignIn,
  clearLogInCreateAccountServerError
} from '../actions/accountActions.js';
import { WebRequestData, required } from '../utils/WebRequestData.js';

import { browserHistory } from 'react-router';

const createAccountData = new WebRequestData([
  new required("name"),
  new required("emailAddress"),
  new required("password", "password1")
]);

const logInData = new WebRequestData([
  new required("emailAddress"),
  new required("password", "password1")
]);

const mapStateToProps = (state, ownProps) => {
  return {
    mode: CREATE_MODE,
    serverError: state.accounts.logInCreateAccountServerError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAccount: (state) => {
      console.log("Requesting create account");
      const accountInfo = createAccountData.extract(state);
      dispatch(requestCreateAccountAndSignIn(accountInfo))
        .then(() => browserHistory.push("/photoshoots"),
              (err) => console.log("Caught error: ", err));
    },
    onLogIn: (state) => {
      console.log("Requesting log in now");
      const accountInfo = logInData.extract(state);
      dispatch(requestSignIn(accountInfo))
        .then(() => {
          browserHistory.push("/photoshoots");
        }, (err) => {
          console.log("Caught error: ", err);
        });
    },
    onClearErrors: () => dispatch(clearLogInCreateAccountServerError())
  };
};

export const AccountAccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCreateAccount);
