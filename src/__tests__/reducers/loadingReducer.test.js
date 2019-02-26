import loading from 'ldmaapp/src/reducers/loadingReducer';
import * as types from 'ldmaapp/src/actions/actionTypes';

describe('loading reducer', () => {
  it('should return the initial state', () => {
    expect(loading(undefined, {})).toEqual(false);
  });

  it('should handle REQUEST_LOGIN', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_LOGIN,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_GET_RANKING', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_RANKING,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_GET_EVENT', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_EVENT,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_GET_TRIP_ALL', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_TRIPS_ALL,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_GET_TRIPS_INFO', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_TRIPS_INFO,
      },
    )).toEqual(true);
  });

  it('should handle REQUEST_LOGIN_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_LOGIN_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_LOGIN_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_LOGIN_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_GET_RANKING_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_RANKING_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_GET_RANKING_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_RANKING_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_GET_EVENT_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_EVENT_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_GET_EVENT_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_EVENT_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_GET_TRIP_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_TRIP_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_GET_TRIP_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_TRIP_FAILURE,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_GET_TRIPS_INFO_SUCCESS', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_TRIPS_INFO_SUCCESS,
      },
    )).toEqual(false);
  });

  it('should handle REQUEST_GET_TRIPS_INFO_FAILURE', () => {
    expect(loading(
      undefined,
      {
        type: types.REQUEST_GET_TRIPS_INFO_FAILURE,
      },
    )).toEqual(false);
  });
});
