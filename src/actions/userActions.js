import { userService } from 'ldmaapp/src/services/userService';
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  REQUEST_LOGOUT,
} from 'ldmaapp/src/actions/actionTypes';
import { openIvalidCredentialsModal } from 'ldmaapp/src/actions/uiActions';
import NavigationService from 'ldmaapp/src/utils/navigation';

export const login = (username, password) => {
  return dispatch => {
    dispatch(request());

    return userService.login(username, password)
      .then(
        user => {
          dispatch(success(user));
          NavigationService.navigate('Main');
        },
        errorCode => {
          dispatch(openIvalidCredentialsModal());
          dispatch(failure(errorCode));
        },
      );
  };

  function request() { return { type: REQUEST_LOGIN }; }
  function success(user) { return { type: REQUEST_LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: REQUEST_LOGIN_FAILURE, error }; }
};

export const logout = () => {
  return dispatch => {
    return userService.logout()
      .then(() => {
        dispatch(requestLogout());
        NavigationService.resetState();
      });
  };

  function requestLogout() { return { type: REQUEST_LOGOUT }; }
};
