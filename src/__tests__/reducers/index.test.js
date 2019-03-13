import ldmaApp from 'ldmaapp/src/reducers/index';

describe('ldmaApp (root) reducer', () => {

  const initialRootState = {
    auth: {},
    loading: true,
    ranking: {},
    trip: {}, tripsInfo: {},
    ui: { "invalidCredentialsModalOpen": false },
  };

  it('should return the initial state', () => {
    expect(ldmaApp(undefined, {})).toMatchObject(initialRootState);
  });
});

