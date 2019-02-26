import {
  REQUEST_GET_TRIPS_INFO,
  REQUEST_GET_TRIPS_INFO_SUCCESS,
  REQUEST_GET_TRIPS_INFO_FAILURE,
} from 'ldmaapp/src/actions/actionTypes';

const tripsInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case REQUEST_GET_TRIPS_INFO:
      return {
        tripsList: [],
      };
    case REQUEST_GET_TRIPS_INFO_SUCCESS:
      return {
        tripsList: action.eventList,
      };
    case REQUEST_GET_TRIPS_INFO_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};

export default tripsInfo;
