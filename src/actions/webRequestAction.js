import $ from 'jquery';
import {browserHistory} from 'react-router';
import {wrapError} from '../utils/webRequestErrorHelper.js';

const apiHost = () => {
  if(process.env.NODE_ENV === 'development') {
    return ""; // Let the proxy configuration redirect to our backend
               // which will also take care of CORS issues!
  } else {
    return "https://kyajjahqj1.execute-api.us-west-2.amazonaws.com/Test1";
  }
};

export const webRequestAction = (url, config) => {
  return (dispatch, getState) => {
    dispatch(config.preRequest());

    const user = getState().accounts.activeSession.user;
    const authToken = user ? user.auth_token : null;
    let headers = {
      SHOOTS_AUTH_TOKEN: authToken
    };

    const fullUrl = apiHost() + url;

    console.log("Attempting to make request with body:", config.data);

    return $.ajax(fullUrl, {
      method: config.method,
      headers: headers,
      data: config.data,
      statusCode: {
        401: (xhr) => {
          console.log("Redirecting to login due to unauthorized");
          browserHistory.push("/account-access");
        }
      }
    })
      .then(
        (response) => {
          let processFunc = config.processResponseData;
          let result = null;
          if (processFunc) {
            result = processFunc(response, user);
          }
          dispatch(config.onSuccess(result));
        },
        (xhr, status, error) => {
          console.log("webRequestAction: Request resulted in error...");
          let wrappedError = wrapError(xhr, status, error);
          dispatch(config.onError(wrappedError));

          // Not sure why can't user Promise.reject("ERROR") here
          throw new Error(error);
        });
  };
};

