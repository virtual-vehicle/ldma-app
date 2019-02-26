import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  REQUEST_LOGOUT,
} from '../actions/actionTypes';

const auth = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
    case REQUEST_LOGOUT:
      return {};
    case REQUEST_LOGIN_SUCCESS:
      return {
        user: action.user,
      };
    case REQUEST_LOGIN_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};

export default auth;
