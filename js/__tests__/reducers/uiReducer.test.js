import * as uiReducer from '../../reducers/uiReducer';
import * as types from '../../actions/actionTypes';

describe('ui reducer', () => {

  const initialState = {
    invalidCredentialsModalOpen: false,
  };

  it('should return the initial state', () => {
    expect(uiReducer.ui(undefined, {})).toEqual(initialState);
  });
});

describe('invalidCredentialsModalOpen reducer', () => {

  it('should return the initial state', () => {
    expect(uiReducer.invalidCredentialsModalOpen(undefined, {})).toEqual(false);
  });

  it('should handle OPEN_INVALID_CREDENTIALS_MODAL', () => {
    expect(uiReducer.invalidCredentialsModalOpen(
      undefined,
      {
        type: types.OPEN_INVALID_CREDENTIALS_MODAL,
      },
    )).toEqual(true);
  });

  it('should handle CLOSE_INVALID_CREDENTIALS_MODAL', () => {
    expect(uiReducer.invalidCredentialsModalOpen(
      undefined,
      {
        type: types.CLOSE_INVALID_CREDENTIALS_MODAL,
      },
    )).toEqual(false);
  });
});
