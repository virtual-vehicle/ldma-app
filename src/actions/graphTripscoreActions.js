import {
    REQUEST_GET_GRAPH_TRIPSCORE,
    REQUEST_GET_GRAPH_TRIPSCORE_SUCCESS,
    REQUEST_GET_GRAPH_TRIPSCORE_FAILURE,
  } from 'ldmaapp/src/actions/actionTypes';
  import { graphTripscoreService } from 'ldmaapp/src/services/graphTripscoreService';

  export const getGraphTripscore = (auth_token) => {
    return dispatch => {
      dispatch(request());

      return graphTripscoreService.getGraphTripscore(auth_token)
        .then(
          tripscoreList => {
            dispatch(success(tripscoreList));
          },
          error => {
            dispatch(failure(error));
          },
      );
    };

    function request() { return { type: REQUEST_GET_GRAPH_TRIPSCORE }; }
    function success(tripscoreList) { return { type: REQUEST_GET_GRAPH_TRIPSCORE_SUCCESS, tripscoreList }; }
    function failure(error) { return { type: REQUEST_GET_GRAPH_TRIPSCORE_FAILURE, error }; }
  };