import {
  REQUEST_GET_TRIPS_INFO,
  REQUEST_GET_TRIPS_INFO_SUCCESS,
  REQUEST_GET_TRIPS_INFO_FAILURE,
} from '../actions/actionTypes';
import { tripsInfoService } from '../services/tripsInfoService';

export const getTripsInfo = (user) => {
  const { auth_token } = user;
  return dispatch => {
    dispatch(request());

    return tripsInfoService.getTripsInfo(auth_token)
      .then(
        tripsList => {
          dispatch(success(tripsList));
        },
        error => {
          dispatch(failure(error));
        },
      );
  };

  function request() { return { type: REQUEST_GET_TRIPS_INFO }; }
  function success(tripsList) { return { type: REQUEST_GET_TRIPS_INFO_SUCCESS, tripsList }; }
  function failure(error) { return { type: REQUEST_GET_TRIPS_INFO_FAILURE, error }; }
};
