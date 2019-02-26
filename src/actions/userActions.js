import { userService } from 'ldmaapp/src/services/userService';
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  REQUEST_LOGOUT,
  GO_TO_MAIN,
  GO_TO_LOGIN,
} from 'ldmaapp/src/actions/actionTypes';
import { openIvalidCredentialsModal } from 'ldmaapp/src/actions/uiActions';

export const login = (username, password) => {
  return dispatch => {
    dispatch(request());

    return userService.login(username, password)
      .then(
        user => {
          dispatch(success(user));
          dispatch(goToMain());
        },
        errorCode => {
          console.log("we come to error");
          dispatch(openIvalidCredentialsModal());
          dispatch(failure(errorCode));
        },
      );
  };

  function request() { return { type: REQUEST_LOGIN }; }
  function success(user) { return { type: REQUEST_LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: REQUEST_LOGIN_FAILURE, error }; }
  function goToMain() { return { type: GO_TO_MAIN }; }
};

export const logout = () => {
  return dispatch => {
    return userService.logout()
      .then(() => {
        dispatch(requestLogout());
        dispatch(goToLogin());
      });
  };

  function requestLogout() { return { type: REQUEST_LOGOUT }; }
  function goToLogin() { return { type: GO_TO_LOGIN }; }
};
