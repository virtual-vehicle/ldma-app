import {
  REQUEST_GET_EVENT,
  REQUEST_GET_EVENT_SUCCESS,
  REQUEST_GET_EVENT_FAILURE,
} from '../actions/actionTypes';

const event = (state = {}, action = {}) => {
  switch (action.type) {
    case REQUEST_GET_EVENT:
      return {
        eventList: [],
      };
    case REQUEST_GET_EVENT_SUCCESS:
      return {
        eventList: action.eventList,
      };
    case REQUEST_GET_EVENT_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};

export default event;
