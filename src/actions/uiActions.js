import {
  OPEN_INVALID_CREDENTIALS_MODAL,
  CLOSE_INVALID_CREDENTIALS_MODAL,
} from './actionTypes';

export const openIvalidCredentialsModal = () => ({
  type: OPEN_INVALID_CREDENTIALS_MODAL,
});

export const closeInvalidCredentialsModal = () => ({
  type: CLOSE_INVALID_CREDENTIALS_MODAL,
});

