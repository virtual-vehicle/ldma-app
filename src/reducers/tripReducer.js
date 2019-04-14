import {
  REQUEST_GET_TRIPS_ALL,
  REQUEST_GET_TRIPS_ALL_SUCCESS,
  REQUEST_GET_TRIPS_ALL_FAILURE,
  REQUEST_GET_TRIPS_INTERVAL,
  REQUEST_GET_TRIPS_INTERVAL_SUCCESS,
  REQUEST_GET_TRIPS_INTERVAL_FAILURE,
  SET_MAP_VISIBLE,
} from 'ldmaapp/src/actions/actionTypes';

const trip = (state = {}, action = {}) => {
  switch (action.type) {
    case REQUEST_GET_TRIPS_ALL:
    case REQUEST_GET_TRIPS_INTERVAL:
      return {
        tripsList: [],
      };
    case REQUEST_GET_TRIPS_ALL_SUCCESS:
    case REQUEST_GET_TRIPS_INTERVAL_SUCCESS:
      return {
        tripsList: action.tripsList,
      };
    case REQUEST_GET_TRIPS_ALL_FAILURE:
    case REQUEST_GET_TRIPS_INTERVAL_FAILURE:
      return {
        error: action.error,
      };
    case SET_MAP_VISIBLE:
      return {
        tripsList: [
          ...state.tripsList.slice(0, action.tripIndex),
          {
            ...state.tripsList[action.tripIndex],
            map_visible: true,
          },
          ...state.tripsList.slice(action.tripIndex + 1),
        ],
      }
    default:
      return state;
  }
};

export default trip;
