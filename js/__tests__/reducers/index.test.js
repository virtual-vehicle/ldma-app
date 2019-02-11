import ldmaApp from '../../reducers/index';

describe('ldmaApp (root) reducer', () => {

  const initialRootState = {
    auth: {},
    event: {},
    loading: false,
    nav: {
      index: 0,
      isTransitioning: false,
      key: "StackRouterRoot",
      routes: [{
        index: 0,
        isTransitioning: false,
        params: undefined,
        routeName: 'AppNavigator',
        routes: [{
          params: undefined,
          routeName: 'Auth',
        }],
      }],
    },
    ranking: {},
    trip: {}, tripsInfo: {},
    ui: { "invalidCredentialsModalOpen": false },
  };


  it('should return the initial state', () => {
    expect(ldmaApp(undefined, {})).toMatchObject(initialRootState);
  });
});

