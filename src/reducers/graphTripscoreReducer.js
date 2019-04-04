import {
  REQUEST_GET_GRAPH_TRIPSCORE,
  REQUEST_GET_GRAPH_TRIPSCORE_SUCCESS,
  REQUEST_GET_GRAPH_TRIPSCORE_FAILURE,
} from 'ldmaapp/src/actions/actionTypes';

const graphTripscore = (state = {}, action = {}) => {
  switch (action.type) {
    case REQUEST_GET_GRAPH_TRIPSCORE:
      return {
        tripscoreList: [],
      };
    case REQUEST_GET_GRAPH_TRIPSCORE_SUCCESS:
      return {
        tripscoreList: action.tripscoreList,
      };
      case REQUEST_GET_GRAPH_TRIPSCORE_FAILURE:
        return {
          error: action.error,
        };
      default:
        return state;
    }
  };

  export default graphTripscore;
