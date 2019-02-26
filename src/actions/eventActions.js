import {
  REQUEST_GET_EVENT,
  REQUEST_GET_EVENT_SUCCESS,
  REQUEST_GET_EVENT_FAILURE,
} from '../actions/actionTypes';
import { eventService } from '../services/eventService';

export const getEvents = (user) => {
  const { auth_token } = user;
  return dispatch => {
    dispatch(request());

    return eventService.getEvents(auth_token)
      .then(
        eventsList => {
          dispatch(success(eventsList));
        },
        error => {
          dispatch(failure(error));
        },
      );
  };

  function request() { return { type: REQUEST_GET_EVENT }; }
  function success(eventsList) { return { type: REQUEST_GET_EVENT_SUCCESS, eventsList }; }
  function failure(error) { return { type: REQUEST_GET_EVENT_FAILURE, error }; }
};
