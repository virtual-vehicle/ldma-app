import auth from 'ldmaapp/src/reducers/authReducer';
import * as types from 'ldmaapp/src/actions/actionTypes';

describe('auth reducer', () => {

  const user = {
    username: '14',
    auth_token: 'token_example_which_comes_from_backend',
  };

  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual({});
  });

  it('should handle REQUEST_LOGIN', () => {
    expect(auth(
      undefined,
      {
        type: types.REQUEST_LOGIN,
      },
    )).toEqual({});
  });

  it('should handle REQUEST_LOGIN_SUCCESS', () => {
    expect(auth(
      undefined,
      {
        type: types.REQUEST_LOGIN_SUCCESS,
        user,
      },
    )).toEqual({ user });
  });

  it('should handle REQUEST_LOGIN_FAILURE', () => {
    expect(auth(
      undefined,
      {
        type: types.REQUEST_LOGIN_FAILURE,
        error: 'Login failure',
      },
    )).toEqual({ error: 'Login failure' });
  });

  it('should handle REQUEST_LOGOUT', () => {
    expect(auth(
      undefined,
      {
        type: types.REQUEST_LOGOUT,
      },
    )).toEqual({ });
  });
});
