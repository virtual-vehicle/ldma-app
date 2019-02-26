import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/userActions';
import * as types from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const username = '14';
const password = 'password';

const user = {
  username: '14',
  auth_token: 'token_example_which_comes_from_backend',
};

describe('user aynchronous actions', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should log in (user logs in)', () => {

    fetch.mockResponseOnce(JSON.stringify(user));

    const expectedActions = [
      { type: types.REQUEST_LOGIN },
      { type: types.REQUEST_LOGIN_SUCCESS, user },
      { type: types.GO_TO_MAIN },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.login(
      username,
      password,
    )).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should logout', () => {

    fetch.mockResponseOnce({ });

    const expectedActions = [
      { type: types.REQUEST_LOGOUT },
      { type: types.GO_TO_LOGIN },
    ];
    const store = mockStore({ });

    return store.dispatch(actions.logout()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

