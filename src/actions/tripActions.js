import {
  REQUEST_GET_TRIPS_ALL,
  REQUEST_GET_TRIPS_ALL_SUCCESS,
  REQUEST_GET_TRIPS_ALL_FAILURE,
  REQUEST_GET_TRIPS_INTERVAL,
  REQUEST_GET_TRIPS_INTERVAL_SUCCESS,
  REQUEST_GET_TRIPS_INTERVAL_FAILURE,
  SET_VISIBLE_MAP,
} from 'ldmaapp/src/actions/actionTypes';
import { tripService } from 'ldmaapp/src/services/tripService';

export const setVisbleMap = tripIndex => ({
  type: SET_VISIBLE_MAP,
  tripIndex,
});

export const getTripsAll = (user) => {
  const { auth_token } = user;
  return dispatch => {
    dispatch(request());

    return tripService.getTripsAll(auth_token)
      .then(
        tripsList => {
          dispatch(success(tripsList));
        },
        error => {
          dispatch(failure(error));
        },
      );
  };

  function request() { return { type: REQUEST_GET_TRIPS_ALL }; }
  function success(tripsList) { return { type: REQUEST_GET_TRIPS_ALL_SUCCESS, tripsList }; }
  function failure(error) { return { type: REQUEST_GET_TRIPS_ALL_FAILURE, error }; }
};

export const getTripsInterval = (user, start_date, end_date) => {
  const { auth_token } = user;
  return dispatch => {
    dispatch(request());

    return tripService.getTripsInterval(auth_token, start_date, end_date)
      .then(
        tripsList => {
          dispatch(success(tripsList));
        },
        error => {
          dispatch(failure(error));
        },
      );
  };

  function request() { return { type: REQUEST_GET_TRIPS_INTERVAL }; }
  function success(tripsList) { return { type: REQUEST_GET_TRIPS_INTERVAL_SUCCESS, tripsList }; }
  function failure(error) { return { type: REQUEST_GET_TRIPS_INTERVAL_FAILURE, error }; }
};
