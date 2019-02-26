import { combineReducers } from 'redux';
import {
  OPEN_INVALID_CREDENTIALS_MODAL,
  CLOSE_INVALID_CREDENTIALS_MODAL,
} from 'ldmaapp/src/actions/actionTypes';

export function invalidCredentialsModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_INVALID_CREDENTIALS_MODAL:
      return true;
    case CLOSE_INVALID_CREDENTIALS_MODAL:
      return false;
    default:
      return state;
  }
}

export const ui = combineReducers({
  invalidCredentialsModalOpen,
});

export default ui;
